<!DOCTYPE html>
<html>

<head>
	<title>Insertion</title>
</head>

<body>
	<center>
		<?php
        // create connection
		$conn = mysqli_connect("localhost", "root", "", "users"); //servername, username, pass, db.
		
		// Check connection
		if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
          }
		
		$fname = $_REQUEST['fname'];
		$lname = $_REQUEST['lname'];
		$username = $_REQUEST['uname'];
		$email = $_REQUEST['email'];
		$password = $_REQUEST['pass'];

		$hashed_password = passwrod_hash($password, PASSWORD_DEFAULT);
		
		// inserting into db
		$sql = "INSERT INTO users VALUES ('$fname',
			'$lname','$username','$email', '$hashed_password')";
		
		// Close connection
		mysqli_close($conn);
		?>
	</center>
</body>

</html>
