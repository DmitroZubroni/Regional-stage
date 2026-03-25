package com.wavesenterprise.app.domain;


public class Postal {

    public String trackNumber; // трек номер
    public String sender; // отправитель
    public String recipient; // получатель
    public String postalType; // тип отправления письмо бандероль посылка
    public int postalClass; //1 2 3 класс отправления
    public int postalTime; // время отвправления
    public double postalPrice; // стоимость доставки
    public int weight; // вес отправления до 10 кг
    public int importantValue; // обЪявленная стоимость
    public double finalPrice; // итоговая цуна отправления
    public  String addressTo; // адрес назначения
    public  String addressFrom; // адресс отправлдения
    public String postalStatus; // статус отправления


    public Postal(String trackNumber, String sender, String recipient, String postalType,int postalClass,
             int weight,int importantValue, String addressTo, String addressFrom) {
        this.trackNumber = trackNumber;
        this.sender = sender;
        this.recipient = recipient;
        this.postalType = postalType;
        this.postalClass = postalClass;
        this.postalTime = calcTime(postalClass);
        this.postalPrice = calcPrice(postalClass, weight);
        this.weight = weight;
        this.importantValue = importantValue;
        this.finalPrice = postalPrice + importantValue * 0.1; // расчитывем финальную стоимость
        this.addressTo = addressTo;
        this.addressFrom = addressFrom;
        this.postalStatus = "active";

    }

    // сопределяем время
    public int calcTime( int postalClass) {
        if (postalClass == 1) return 5;
        if (postalClass == 2) return 10;
        return 15;
    }
    // сразу определяем стоимость отпрпавления без обЪявленной стоимости
    public double calcPrice(int postalClass, int weight) {
        if (postalClass == 1) return weight * 0.5;
        if (postalClass == 2) return weight * 0.3;
        return weight * 0.1;
    }

    public Postal(){}

}
