<?php
// this file will add habits to the database 
// objects need to be correctly sent from react components, they will not be modified here, only replacing whats already in the database

		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Headers: Content-Type');

		// create connection
		// this is the database I used to test locally
		// servername, username, password, database name.
		$conn = mysqli_connect("oceanus.cse.buffalo.edu:3306", "", "", "cse442_2023_spring_team_q_db");

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }else{
			echo "Connected successfully\n";
		}

		// Takes raw data from the request
		$json = file_get_contents('php://input');
		// Parses json object, true flag turns it into array rather than stdClass
		$data = json_decode($json, true);

        $id = (int)$data['id'];

        //NEW CODE STARTING HERE
        //$habit = json_encode($data['habit'],JSON_FORCE_OBJECT);
        $counter = (int)$data['counter'];
        $type = (string)$data['type'];
        $title = (string)$data['title'];

        if (strcmp($type, "Good") == 0){
            $query = "SELECT 'good_habits' FROM users WHERE id = '{$id}'";
		    $result = mysqli_query($conn,$query);
		    $good = $result->fetch_assoc();        
            $pgood = json_decode($good, true);  
            $pgood->{$title}->{'counter'} = $counter;      //am i properly reassigning the counter

            //taken from insert.php
            $sql = "INSERT INTO users (good_habits) VALUES ('$good')";
			if(mysqli_query($conn, $sql)){
				echo "\nRecords added successfully.\n";
			} else{
				echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
			}

        }

?>