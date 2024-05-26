# urlShortner

## 1. Install

- npm i express sequelize mysql2


## 2. mysql -u root -p  

- mysql> create database urlshortdb;
Query OK, 1 row affected (0.01 sec)

- mysql> create user urluser identified by 'urlpass';
Query OK, 0 rows affected (0.02 sec)

- mysql> grant all privileges on urlshortdb.* to urluser;
Query OK, 0 rows affected (0.00 sec)

- mysql> flush privileges;
Query OK, 0 rows affected (0.01 sec)

- mysql> exit

##  3. mysql -u urluser -p

- mysql> show databases; //Must show urlshortdb