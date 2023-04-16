<?php
// this file will add habits to the database 
// objects need to be correctly sent from react components, they will not be modified here, only replacing whats already in the database

		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Headers: Content-Type');

		// create connection
		// this is the database I used to test locally
		// servername, username, password, database name.
		$conn = mysqli_connect("oceanus.cse.buffalo.edu:3306", "", "", "cse442_2023_spring_team_q_db"); 
		// $conn = mysqli_connect("localhost:3306", "root", "blkjesus", "atomic_test"); 

		// this is our groups database
		//$conn = mysqli_connect("", "", "", ""); //servername, username, pass, db.


		// the database will have one table for now
		// users table: holds id (int), username, email, password, good_habits, bad_habits, and dates
		// good_habits and bad_habits is a json object that holds all the habits as objects
		// habits in users table should have a universal style in the application
		// for example one habit will contain other information
		// "Drink Water": {'counter': 0, 'total': 8, 'details': '8 glasses a day is recommended for gut and skin health.','category':'health,'days':{}}
		// counter will be incremented up to the total number when logged by the user
		// days will look something like "Days": {7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {date: [date], counter: 0}}
		// where each integer key represents the day of the week and each value represents the counter for that day
		// the key 0 represents the current day and holds the current key and counter in order to correctly track days
		// on a new day, the counter information from key 0 will be moved up to 1 and 0 will be replaced with the new date and so on
		// this will represent a queue structure

		
		
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
		$prep_stmt = "SELECT * FROM users WHERE id = ? LIMIT 1";
		$stmt = $conn->prepare($prep_stmt);
		$stmt->bind_param('i', $id);
		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();

		print(gettype($bad));
		
		// now add habit and date objects into users table
		$stmt = $conn->prepare("UPDATE users SET `good_habits` = ?, `bad_habits` = ? WHERE `id` = ?");
		$stmt->bind_param("ssi", $good, $bad, $id); 

		if ($stmt->execute()) {
            echo "Records added successfully.\n";
		} else {
			echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
		}

		// Close connection
		mysqli_close($conn);
	?>