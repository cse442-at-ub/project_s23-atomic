<?php 

	// header('Access-Control-Allow-Origin: http://localhost:3000'); // Connects to front-end
	header('Access-Control-Allow-Origin: *');
		
	// create connection
	// this is the database I used to test locally
	// servername, username, password, database name.
	// this is our groups database
	$conn = mysqli_connect("oceanus.cse.buffalo.edu:3306", "", "", "cse442_2023_spring_team_q_db");


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
	$password = mysqli_real_escape_string($conn,$data["password"]);
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

	// functions to check if email or usernames exist in database
	function usernameExists($conn,$input) {
		$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
		$stmt->bind_param("s", $input);
		$stmt->execute();

		$result = $stmt->get_result(); // get the mysqli result
		$row = $result->fetch_assoc(); // fetch data

		// if row exists, return true, else return false
		if ($row) {
			return true;
		} else {
			return false;
		}
	}
	// if username doesn't exist in database, send back error message
	if(!usernameExists($conn,$username)){
		// this will send back Username message, login ReactJS component will pull this message and deal with it 
		echo "Invalid Username\n";
	} else{
		// this will send back Success message, login ReactJS component will pull this message and deal with it
        $sql=mysqli_query($conn, "UPDATE users SET password = '$hashed_password' WHERE username = '$username'");
        if($sql){
            $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
		    $stmt->bind_param("s", $username);
		    $stmt->execute();

		    $result = $stmt->get_result(); // get the mysqli result
		    $row = $result->fetch_assoc(); // fetch data

            echo $row["id"]."\n";
		    echo $username."\n";
		    echo "\nRecords checked successfully.\n";
        }
	}
	// Close connection
	mysqli_close($conn);

?>