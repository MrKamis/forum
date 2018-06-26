<?php
    require('db.php');
    header('Content-Type: text/plain');

    try{

        $db_query = $db_conn->prepare('SELECT * FROM forum_kategorie');
        $db_query->execute();
        $result = $db_query->fetchAll();

        class Kategoria {
            public $nazwa;
            public $data;
            public $ostatni;
            public $tematy;
            public function __construct($table){
                $this->nazwa = $table['nazwa'];
                $this->data = $table['data'];
                $this->tematy = $table['tematy'];
                $this->ostatni = $table['ostatni'];
            }
        };

        $table = [];

        foreach($result as $item){
            array_push($table, new Kategoria($item));
        }

        print(json_encode($table));

    }catch(Exception $e){
        print($e->getCode());
    }
?>