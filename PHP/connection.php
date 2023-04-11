<?php

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "Cutforvader#19";
$dbname = "testTable";

if(!$con = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname))
{

	die("failed to connect!");
}
