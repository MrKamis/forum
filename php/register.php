<?php
    require('db.php');
    header('Content-Type: text/plain');

    try {

        $db_query = $db_conn->prepare('SELECT * FROM forum_user WHERE login=:login');
        $db_query->bindParam(':login', $_POST['login']);
        $db_query->execute();
        $result = $db_query->fetchAll();

        if(empty($result)) {

            $db_query = $db_conn->prepare('INSERT INTO forum_user(login, haslo, email, ilosc_tematow, ilosc_kategorii, wiadomosci, uprawnienia) VALUES(:login, :haslo, "email", 0, 0, "[]", 1)');
            $db_query->bindParam(':login', $_POST['login']);
            $password = md5($_POST['password'].'salt');
            $db_query->bindParam(':haslo', $password);
            
            if($db_query->execute()){

                print(0);

            }else{
                throw new Exception('Error', 2);
            }

        }else {
            throw new Exception('User with that login exist!', 1);
        }

    } catch(Exception $e) {
        print($e->getCode());
    }
?>