package com.wavesenterprise.app.domain;


public class Transfer {

    public String sender; // отправитель
    public String recipient; // получатель
    public double amount; // сумма перевода
    public String timeLive; // время жизги перевода
    public String transferId; // айди переволда
    public String transferStatus; // статус перевода

    public Transfer(String sender, String recipient, double amount, String timeLive, String transferId) {
        this.sender = sender;
        this.recipient = recipient;
        this.amount = amount;
        this.timeLive = timeLive;
        this.transferId = transferId;
        this.transferStatus = "active";
    }

    public Transfer() {}

}
