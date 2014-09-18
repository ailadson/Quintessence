<?php

$json = file_get_contents('php://input');
$ether = json_decode($json);

echo $ether;

?>