<?php

$data = json_decode(file_get_contents('php://input'));
echo "hey";
echo var_dump($data->name);

?>