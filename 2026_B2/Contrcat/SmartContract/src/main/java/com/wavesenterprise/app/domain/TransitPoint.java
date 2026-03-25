package com.wavesenterprise.app.domain;

public class TransitPoint {

    public String employeeAddress; // адрес сотрудника который принял отправление
    public String trackNumber; // трэк номер отправления
    public int weight; // вес отправления

    public TransitPoint(String employeeAddress,String trackNumber, int weight) {
        this.employeeAddress = employeeAddress;
        this.trackNumber = trackNumber;
        this.weight = weight;
    }

    public TransitPoint() {}
}
