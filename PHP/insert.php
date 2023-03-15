<?php
		// header('Access-Control-Allow-Origin: http://localhost:3000'); // Connects to front-end
		header('Access-Control-Allow-Origin: *');
		
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

		// save information that came from post request
		$data = $_POST;
		// save information that was sent
		$username = mysqli_real_escape_string($conn,$data["username"]);
		$email = mysqli_real_escape_string($conn,$data["email"]);
		$password = mysqli_real_escape_string($conn,$data["password"]);
		// hash password using php function
		$hashed_password = password_hash($password, PASSWORD_DEFAULT);

		// functions to check if email or usernames exist in database
		// prevent duplicate accounts
		function emailExists($conn,$input) {
			$query = "SELECT * FROM users WHERE email = '{$input}'";
			$result = mysqli_query($conn,$query);
			return $result;
		}
		function usernameExists($conn,$input) {
			$query = "SELECT * FROM users WHERE username = '{$input}'";
			$result = mysqli_query($conn,$query);
			return $result;
		}

		// if account is unique, add to database, if not return message of what is not unique 
		if (mysqli_num_rows(emailExists($conn,$email)) != 0) {
			// this will send back Email message, signin ReactJS component will pull this message and deal with it 
			echo "Email\n";
		} else if(mysqli_num_rows(usernameExists($conn,$username)) != 0){
			// this will send back Username message, signin ReactJS component will pull this message and deal with it 
			echo "Username\n";
		} else{
			// insert into database
			// only inserting registration values, next page will allow user to choose habits, which will be added in the database 
			// in another php file
			$sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hashed_password')";
			if(mysqli_query($conn, $sql)){
				// want to save user id to send back
				$query = "SELECT id FROM users WHERE username = '{$username}'";
				$result = mysqli_query($conn,$query);
				$row = $result->fetch_assoc();
				echo $row["id"];
				echo "\nRecords added successfully.\n";
			} else{
				echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
			}

		}

		// Close connection
		mysqli_close($conn);
	?>