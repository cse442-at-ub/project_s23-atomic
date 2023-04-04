<?php
// this file is for getting a users information
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Headers: Content-Type');

		// create connection
		// this is the database I used to test locally
		// servername, username, password, database name.
		$conn = mysqli_connect("localhost:3306", "root", "blkjesus", "atomic_test"); 

		// this is our groups database
		// $conn = mysqli_connect("", "", "", ""); //servername, username, pass, db.


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

		// want to pull out users information from users table using id
		$query = "SELECT * FROM users WHERE id = '{$id}'";
		$result = mysqli_query($conn,$query);
		$row = $result->fetch_assoc();
        
        // pull out data we need from database
        $username = $row["username"];
        $good_habits = $row["good_habits"];
        $bad_habits = $row["bad_habits"];

        $return_data = json_encode(array("id" => $id, "username" => $username, "good_habits"=>$good_habits, "bad_habits"=>$bad_habits), JSON_FORCE_OBJECT);
        
        if(mysqli_query($conn, $sql)){
            echo $return_data;
        } else{
            echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
        }

		// Close connection
		mysqli_close($conn);
	?>