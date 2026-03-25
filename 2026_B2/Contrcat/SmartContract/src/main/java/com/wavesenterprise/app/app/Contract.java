package com.wavesenterprise.app.app;

import com.wavesenterprise.app.domain.*;
import com.wavesenterprise.sdk.contract.api.annotation.*;
import com.wavesenterprise.sdk.contract.api.domain.ContractCall;
import com.wavesenterprise.sdk.contract.api.state.ContractState;
import com.wavesenterprise.sdk.contract.api.state.TypeReference;
import com.wavesenterprise.sdk.contract.api.state.mapping.Mapping;

import java.time.format.DateTimeFormatter;
import java.util.Objects;
import java.util.UUID;

@ContractHandler
public class Contract {

    private ContractCall call;
    private ContractState state;

    private final Mapping<User> users;
    private final Mapping<Postal> postals;
    private final Mapping<Transfer> transfers;
    private final Mapping<TransitPoint> transits;

    public Contract(ContractCall call, ContractState state) {
        this.call = call;
        this.state = state;

        this.users = state.getMapping(new TypeReference<User>() {}, "USER_MAPPING");
        this.postals = state.getMapping(new TypeReference<Postal>() {}, "POSTAL_MAPPING");
        this.transfers = state.getMapping(new TypeReference<Transfer>() {}, "TRANSFER_MAPPING");
        this.transits = state.getMapping(new TypeReference<TransitPoint>() {}, "TRANSIT_MAPPING");
    }

    public void createUser( String name, String homeAddress, String blockchainAddress, int balance, String role, String postId) {
        User user = new User(name, homeAddress, blockchainAddress, balance, role, postId);
        users.put(blockchainAddress, user);
    }

    @ContractInit
    public void init() {
            createUser("Семенов Семен Семенович", "",  "3NdxqQ87UixBAXK5EMucD7XYxPFe8jo8nnZ", 50, "admin", "");
            createUser("Семенов Семен Семенович", "ПО г. Ростова-на-Дону",  "3NqLzRrvyBmzWy466na3tFLEWMyv2Jw7wMZ", 50, "employee", "344000");
            createUser("Антонов Антон Антонович", "ПО г. Таганрога",  "3NnDMmMFambx1wAA9xW1bXfM4yeJn7kH1vW", 50, "employee", "347900");
            createUser("Юрьев Юрий Юрьевич", "KSIPT",  "3Nu65wwizkHH6E8KcNQyckFsfnUvyFb1qvm", 50, "user", "");

    }


    int dalyCounter = 0; // счётчик отправлений

    /*
    формирование трек номера почтового отправления
     */
    public String generationTrackNumber(String addressTo, String addressFrom) {
        DateTimeFormatter now = DateTimeFormatter.ofPattern("ddMMyyy"); // получаем дату
        DateTimeFormatter datastr = DateTimeFormatter.ofPattern(now.toString()); // переводим её в формат строки
        dalyCounter += 1; // обновляем счётчик
        return "RR" + dalyCounter + datastr + addressTo + addressFrom; // получаем готовый трек номер
    }

    /*
    регистрация
     */
    @ContractAction
    public void registration(String name, String homeAddress) {
        createUser(name, homeAddress, call.getCaller(), 0, "user", "" ); // создаём пользователя и добавляем его в блокчейн
    }

    /*
    авторизация
     */
    @ContractAction
    public void autorization() {
        User atlant = users.get(call.getCaller()); // получаем поля пользователя
        atlant.isAutorizathion = true; // изменяем его поля
        users.put(call.getCaller(), atlant); // записываем информацию в стейт блокчейна
    }

    /*
    изменение персональных данных
     */
    @ContractAction
    public void setPersonInfo(String name, String homeAddress) {
        User atlant = users.get(call.getCaller());
        atlant.name = name; // меняем имя
        atlant.homeAddress = homeAddress; // меняем домашний адрес
        users.put(call.getCaller(), atlant); // записываем данные в блокчейн
    }


    //-------------------------------------------------------------------------------------

    /*
    добавление/удаление сотрудника
     */
    @ContractAction
    public void setEmployee(String userAddress, String postId, boolean isEmployee) {
        User admin = users.get(call.getCaller());
        if(Objects.equals(admin.role, "admin")) { // проверяем, что пользователь является администратором
            User user = users.get(userAddress); // получаем обычного пользователя
            if(isEmployee) { // проверяем что хочет сделать админ удалить или добавить сотрудника
                user.postId = "RR" + postId;  // добавляем айди и меняем роль на сотрудника
                user.role = "employee";
            } else {
                user.postId = null; // обнуляем данные и меняем роль на обычного пользователя
                user.role = "user";
            }

        }
    }

    /*
    изменение айди почтового отделения у сотрудника
     */
    public void setPostId(String userAddress, String postId) {
        User atlant = users.get(call.getCaller());
        if(Objects.equals(atlant.role, "admin")) { // проверяем, что пользователь является администратором
            User user = users.get(userAddress); // изменяем у пользователя айди почтового отделения
            user.postId = postId;
            users.put(userAddress, user); // записываем данные в блокчейн
        }
    }

    //--------------------------------------------------------------------------------------

    /*
    отправить почтовое отправление
     */
    @ContractAction
    public void sendPostal( String recipient, String postalType,int postalClass,
                           int weight,int importantValue, String addressTo, String addressFrom) {
        User user = users.get(call.getCaller());
        String trackNumber = generationTrackNumber(addressFrom, addressTo); // получаем трек номер
        Postal postalItem = new Postal(trackNumber, call.getCaller(), recipient, postalType, postalClass, weight, importantValue, addressTo, addressFrom); // создаём экземпляр класс почтового отправления
        postals.put(trackNumber, postalItem);
        // вычитаем стоимость отправления из баланса пользователя
        user.balance = user.balance - postalItem.finalPrice ; // обновляем баланс пользователя
        users.put(call.getCaller(), user); // записываем данные в систему

    }

    /*
    записать данные об почтовом отправлении
     */
    @ContractAction
    public void addTransitPoint(String trackNumber) {
        User atlant = users.get(call.getCaller());
        if(Objects.equals(atlant.role, "employee")) { // проверяем что пользователь является сотрудником
            Postal postalItem = postals.get(trackNumber);
            int weight = postalItem.weight; // получаем вес отправления
            TransitPoint newTransitPoint = new TransitPoint(call.getCaller(), trackNumber, weight); // создаём экземпляр класса почтового отправления
            transits.put(trackNumber, newTransitPoint); // по трек номеру записываем точку транзита
        }

    }

    /*
    принять почтовое отправление
     */
    @ContractAction
    public void getPostal(String trackNumber, boolean accepted) {
        Postal postalItem = postals.get(trackNumber); // получаем отправление
        if(Objects.equals(postalItem.recipient, call.getCaller()) && Objects.equals(postalItem.postalStatus, "active")) { // проверяем, что посылка отправлена именно этому пользователю
                if(accepted){
                    postalItem.postalStatus = "confirmed";
                } else {
                    postalItem.postalStatus = "refuse";
                }
                postals.put(trackNumber, postalItem);
        }
    }

    //---------------------------------------------------------------------------------------

    /*
    отправить денежный перевод
     */
    @ContractAction
    public void sendTransfer( String recipient, double amount, String timeLive) {
        User user = users.get(call.getCaller());
        String transferId = UUID.randomUUID().toString(); // создаём айди перевода
        Transfer newTransfer = new Transfer(call.getCaller(), recipient, amount, timeLive, transferId); // создаём структуру самого перевода
        transfers.put(transferId, newTransfer); // записываем перевод в блокчейн
        // списываем средства с отправителя
        user.balance = user.balance - amount;
        users.put(call.getCaller(), user); // записываем данные в блокчейн
    }

    /*
    получить денежный перевод
     */
    @ContractAction
    public void getTransfer(String transferId, boolean accepted) {
        Transfer transferItem = transfers.get(transferId);
        if(Objects.equals(transferItem.recipient, call.getCaller()) && Objects.equals(transferItem.transferStatus, "active")) { // проверяем что пользователь является тем кому отправили перевод
            if(accepted){
                transferItem.transferStatus = "confirmed";
            } else {
                transferItem.transferStatus = "refuse";
            }
            String recipient = accepted ? call.getCaller() : transferItem.sender;
            User user = users.get(recipient);

                transfers.put(transferId, transferItem); // записываем данные в блокчейн
                user.balance = user.balance + transferItem.amount; // переводим токены пользователю
                users.put(recipient, user); // записываем данные в блокчейн

            }
        }

}
