<?php
    require('db.php');
    header('Content-Type: text/plain');

    try {

        $db_query = $db_conn->prepare('SELECT * FROM forum_user WHERE login=:login AND haslo=:password');
        $db_query->bindParam(':login', $_POST['login']);
        $password = md5($_POST['password'].'salt');
        $db_query->bindParam(':password', $password);
        $db_query->execute();

        $result = $db_query->fetchAll();
        
        if(empty($result)) {
            throw new Exception('No user found', 1);
        } else {
            print('0');
        }

    } catch(Exception $e) {
        print($e->getCode());
    }
?>