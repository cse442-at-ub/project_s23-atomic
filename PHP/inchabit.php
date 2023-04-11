<?php

        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Content-Type');

	    // create connection
	    // this is the database I used to test locally
	    // servername, username, password, database name.
	    $conn = mysqli_connect("localhost:3306", "root", "Cutforvader#19", "testTable"); 

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
		$habit = (string)$data['habit'];


		$good = mysql_query("SELECT good_habits FROM users WHERE id = '{$id}'");
		$bad = mysql_query("SELECT bad_habits FROM users WHERE id = '{$id}'");

		$pgood = json_decode($good, true);
		$pbad = json_decode($bad, true);

		if ($pgood->$habit)




?>