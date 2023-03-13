<?php
		// header('Access-Control-Allow-Origin: http://localhost:3000'); // Connects to front-end
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Headers: Content-Type');

        // create connection
		$conn = mysqli_connect("localhost:3306", "root", "blkjesus", "atomic_test"); //servername, username, pass, db.

		// the database will have two tables
		// users: holds id, username, email, password, good_habits, bad_habits
		// log: holds id, username, email, and dates, which contains json string of all the habits tracked in a date
		// habits in log and users table should have a universal style in the application
		// for example one habit will contain other information
		// 'drink water' : {'counter': 0, 'total': 8, details: '', category:''}
		// in the track table, counter will be incremented up to the total number
		
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


		// want to pull out users information from users table
		$query = "SELECT * FROM users WHERE id = '{$id}'";
		$result = mysqli_query($conn,$query);
		$row = $result->fetch_assoc();
		
		$username = $row["username"];
		$email = $row["email"];


		// insert into log table since we want to initialize first date for logging habits
		// dates column in database will be a json object where the date is the key and the 
		// value is an object that stores habit information
		// i.e: {date: {"drink water": 'counter': 3, 'total': 8...}}
		$date = date("Y:m:d");
		$date_object = json_encode(array($date => []), JSON_FORCE_OBJECT);
        $sql = "INSERT INTO log (id, username, email, dates) VALUES ($id,'$username', '$email', '$date_object')";
		if(mysqli_query($conn, $sql)){
            echo "Records added successfully.\n";
        } else{
            echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
        }
		// add habit bjects into users table
		$sql = "UPDATE users SET `good_habits` = '$good', `bad_habits` = '$bad' WHERE `id` = $id";
        if(mysqli_query($conn, $sql)){
            echo "Records added successfully.\n";
        } else{
            echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
        }

		// Close connection
		mysqli_close($conn);
	?>