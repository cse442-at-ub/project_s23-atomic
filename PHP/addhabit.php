<?php
		// header('Access-Control-Allow-Origin: http://localhost:3000'); // Connects to front-end
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Headers: Content-Type');

       // create connection
		// this is the database I used to test locally
		// servername, username, password, database name.
		// $conn = mysqli_connect("localhost:3306", "root", "blkjesus", "atomic_test"); 
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

		// Takes raw data from the request
		$json = file_get_contents('php://input');
		// Parses json object, true flag turns it into array rather than stdClass
		$data = json_decode($json, true);

		// want to encode the objects in json to store in database
		$id = (int)$data['id'];
		$good = json_encode($data['good_habits'],JSON_FORCE_OBJECT);
		$bad = json_encode($data['bad_habits'],JSON_FORCE_OBJECT);

		// want to pull out users information from users table using id
		$query = "SELECT * FROM users WHERE id = '{$id}'";
		$result = mysqli_query($conn,$query);
		$row = $result->fetch_assoc();
		
		// save username and email to add to log table
		$username = $row["username"];
		$email = $row["email"];


		// We want to initialize first date for logging habits
		// dates column in database will be a json object where the date is the key and the 
		// value is another object that stores habit information
		// i.e: {date: {"drink water": {'counter': 3, 'total': 8...},...}
		$date = date("Y:m:d");
		$date_object = json_encode(array($date => []), JSON_FORCE_OBJECT);
		// now add habit and date objects into users table
		$sql = "UPDATE users SET `good_habits` = '$good', `bad_habits` = '$bad', `dates` = '$date_object' WHERE `id` = '$id'";
        if(mysqli_query($conn, $sql)){
            echo "Records added successfully.\n";
        } else{
            echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
        }

		// Close connection
		mysqli_close($conn);
	?>