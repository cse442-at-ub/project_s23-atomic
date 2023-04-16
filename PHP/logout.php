<?php

session_start();

if(isset($_SESSION['user_id']))
{
	unset($_SESSION['user_id']);

}
setcookie("cookieboy", "", time()-3600); //destroying the cookie during log out, so from next time user needs to log in again.
header("Location: login.php");
die;