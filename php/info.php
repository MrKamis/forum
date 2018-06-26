<?php
    header('Content-Type: text/plain');
    require('db.php');

    try {

        $db_query = $db_conn->prepare('SELECT * FROM forum_user WHERE login=:login');
        $db_query->bindParam(':login', $_POST['login']);
        $db_query->execute();
        $result = $db_query->fetchAll();

        if(empty($result)) {
            throw new Exception('User do not exist!', 1);
        }else {

            class User {
                public $login;
                public $uprawnienia;
                public $email;
                public $wiadomosci;
                public $ilosc_tematow;
                public $ilosc_kategorii;
                public function __construct($table){
                    $this->login = $table['login'];
                    $this->uprawnienia = $table['uprawnienia'];
                    $this->email = $table['email'];
                    $this->wiadomosci = $table['wiadomosci'];
                    $this->ilosc_tematow = $table['ilosc_tematow'];
                    $this->ilosc_kategorii = $table['ilosc_kategorii'];
                }
            }

            $user = new User($result);
            print(json_encode($user));

        }

    }catch(Exception $e) {
        print($e->getCode());
    }
?>