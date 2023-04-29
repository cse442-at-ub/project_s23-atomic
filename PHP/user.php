<?php
// this file is for getting a users information
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Headers: Content-Type');

		// create connection
		// this is the database I used to test locally
		// servername, username, password, database name.
		// $conn = mysqli_connect("oceanus.cse.buffalo.edu:3306", "argraca", "50301883", "cse442_2023_spring_team_q_db"); 

		$conn = mysqli_connect("localhost:3306", "root", "blkjesus", "atomic_test"); 


		// this is our groups database
		// $conn = mysqli_connect("", "", "", ""); //servername, username, pass, db.

		// Check connection
		if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }else{
			echo "Connected successfully\n";
		}

		// // Get the userid from the URL
		$id = (int)htmlspecialchars($_GET["userid"]);

		// want to pull out users information from users table using id
		$stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
		$stmt->bind_param("i", $id); 

		if ($stmt->execute()) {

			$result = $stmt->get_result();
			$row = $result->fetch_assoc();

			// pull out data we need from database
			$username = $row["username"];
			$good_habits = $row["good_habits"];
			$bad_habits = $row["bad_habits"];

			echo $username . "\n";
			echo $good_habits . "\n";
			echo $bad_habits . "\n";
		} else {
            echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
		}

		// Close connection
		mysqli_close($conn);
	?>