CREATE DATABASE my_forum;

USE my_forum;

CREATE TABLE forum_kategorie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nazwa VARCHAR(50),
    ostatni VARCHAR(30),
    data TEXT,
    tematy LONGTEXT
);

CREATE TABLE forum_user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(30),
    haslo TEXT,
    ilosc_tematow INT,
    ilosc_kategorii INT,
    email TEXT,
    wiadomosci TEXT,
    uprawnienia INT
);

////////////////////
UPRAWNIENIA: 
1 - uzytkownik moze odpowiadac na tematy, nie moze twrzyc tematow i kategorii,
2 - + tworzenie tematow
3 - + tworzenie kategorii
4 - + usuwanie
5 - *