<?php
// connecting the database with your device info
$db = mysqli_connect("host_name", "username", "password", "database");

//retrieving username and password of user
$username = $_POST['username'];
$password = $_POST['password'];

// check if the credentials are valid
$query = "SELECT * FROM users WHERE username = '$username' AND password= '$password'";
$result = mysqli_query($db, $query);

if(mysqli_num_rows($result)==1){
    header('Location: dashboard.php');
} else {
    echo "Invalid username or password";
}

mysqli_close($db);
?>

