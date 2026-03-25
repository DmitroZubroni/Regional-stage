package com.wavesenterprise.app.domain;

public class User {

    public String name; // имя
    public String homeAddress; // домашний адрес
    public String blockchainAddress; // блокчейн адрес
    public double balance; // баланс
    public String role; // роль
    public String postId; // айди почтового отделения
    public boolean isAutorizathion; // авторизован пользователь или нет


    public User( String name, String homeAddress, String blockchainAddress, double balance, String role, String postId) {
        this.name = name;
        this.homeAddress = homeAddress;
        this.blockchainAddress = blockchainAddress;
        this.balance = balance;
        this.role = role;
        this.postId = "RR" + postId;
        this.isAutorizathion = false;
    }

    public User(){}
}
