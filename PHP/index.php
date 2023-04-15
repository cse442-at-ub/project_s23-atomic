<?php 
session_start();

	include("connection.php");
	include("functions.php");

	if(!isset($_COOKIE["cookieboy"]))
	{
		header("Location: login.php");
	} //checks if cookie is already set, if not you are redirected to login page. 

	$user_data = check_login($con);

?>

<!DOCTYPE html>
<html>
<head>
	<title>My website</title>
</head>
<body>

	<a href="logout.php">Logout</a>
	<h1>This is the index page</h1>

	<br>
	Hello, <?php echo $user_data['user_name']; ?>
</body>
</html>