<?php
// this file is for getting a users information using username
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type');

    // create connection
    // this is the database I used to test locally
    // servername, username, password, database name.
    // $conn = mysqli_connect("localhost:3306", "root", "blkjesus", "atomic_test"); 

    // this is our groups database
    // $conn = mysqli_connect("oceanus.cse.buffalo.edu:3306", "argraca", "50301883", "cse442_2023_spring_team_q_db"); //servername, username, pass, db.
    $conn = mysqli_connect("localhost:3306", "root", "blkjesus", "atomic_test"); 


    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }else{
        echo "Connected successfully\n";
    }

    // // Get the userid from the URL
    $username = htmlspecialchars($_GET["userid"]);

    // want to pull out users information from users table using id
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username); 

    if ($stmt->execute()) {

        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        // pull out data we need from database
        $id = $row["id"];
        $good_habits = $row["good_habits"];
        $bad_habits = $row["bad_habits"];

        echo $id . "\n";
        echo $good_habits . "\n";
        echo $bad_habits . "\n";
    } else {
        echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
    }

    // Close connection
    mysqli_close($conn);
?>