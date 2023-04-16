<?php

$dbhost = "oceanus.cse.buffalo.edu:3306";
$dbuser = "argraca";
$dbpass = "50301883";
$dbname = "cse442_2023_spring_team_q_db";

if(!$con = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname))
{

	die("failed to connect!");
}
