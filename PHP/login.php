<?php 

	// header('Access-Control-Allow-Origin: http://localhost:3000'); // Connects to front-end
	header('Access-Control-Allow-Origin: *');
		
	// create connection
	// this is the database I used to test locally
	// servername, username, password, database name.
	$conn = mysqli_connect("localhost:3306", "root", "password", "testdb"); 
	// this is our groups database
	// $conn = mysqli_connect("oceanus.cse.buffalo.edu:3306 ", "karlitho", "50308831", "cse442_2023_spring_team_q_db"); //servername, username, pass, db.


	// the database will have one table for now
	// users table: holds id (int), username, email, password, good_habits, bad_habits, and dates
	// good_habits and bad_habits is a json object that holds all the habits as objects
	// habits in log and users table should have a universal style in the application
	// for example one habit will contain other information
	// 'drink water' : {'counter': 0, 'total': 8, details: '', category:''}
	// counter will be incremented up to the total number when logged by the user
	// dates will look something like {"2023:3:13":{'drink water' : {'counter': 0, 'total': 8, details: '', category:''}}}
	
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}else{
		echo "Connected successfully\n";
	}

	// if(isset($_COOKIE["cookieboy"]))
	// {
	// 	echo $_COOKIE["cookieboy"]; //if cookie is already set, user should not be able to access login page, they should be redirected to homepage.
	// 	echo "\ncookie already set\n";
	// }

	// save information that came from post request
	$data = $_POST;
	// save information that was sent
	$username = mysqli_real_escape_string($conn,$data["username"]);
	$password = mysqli_real_escape_string($conn,$data["password"]);

	// functions to check if email or usernames exist in database
		function usernameExists($conn,$input) {
			$query = "SELECT * FROM users WHERE username = '{$input}'";
			$result = mysqli_query($conn,$query);
			return $result;
		}
		// function passwordverify($conn,$input) {
		// 	$query = "SELECT id FROM users WHERE username = '{$input}'";
		// 	$result = mysqli_query($conn,$query);
		// 	$row = $result->fetch_assoc();
		// 	if (password_verify($password, $row["password"])){
		// 		return 0;
		// 	}
		// 	return 1;
		// }
	// if account is unique, add to database, if not return message of what is not unique 
	if(mysqli_num_rows(usernameExists($conn,$username)) != 1){
		// this will send back Username message, login ReactJS component will pull this message and deal with it 
		echo "Invalid\n";
	} else{
		// this will send back Success message, login ReactJS component will pull this message and deal with it
		$query = "SELECT id FROM users WHERE username = '{$username}'";
		$result = mysqli_query($conn,$query);
		$row = $result->fetch_assoc();
		if (password_verify($password, $row["password"])){
			echo $row["id"];
			echo "\nRecords checked successfully.\n";
		}
		else{
			echo "Invalid\n";
		}
	}
	// Close connection
	mysqli_close($conn);

?>