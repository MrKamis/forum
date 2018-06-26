<?php

    $db_user = 'root';
    $db_password = '';
    $db_host = '127.0.0.1';
    $db_name = 'my_forum';

    $db_conn = new PDO('mysql:host='.$db_host.';dbname='.$db_name, $db_user, $db_password);
?>