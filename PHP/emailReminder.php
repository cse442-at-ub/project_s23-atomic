<?php
// Set up database connection
$host = "";
$username = "";
$password = "";
$dbname = "";
$conn = mysqli_connect($host, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Set up email sending
$from_email = "atomic@habits.com";
$from_name = "Atomic Habits";
$subject = "Reminder: Check and Do Your Habits";
$message = "Hi there,\n\nDon't forget to check and do your daily habits today!\n\nBest regards,\nYour Name";

// Get all users' email addresses
$sql = "SELECT email FROM users";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $to_email = $row["email"];
        // Send email reminder to user
        $headers = "From: " . $from_name . " <" . $from_email . ">\r\n";
        if (mail($to_email, $subject, $message, $headers)) {
            echo "Reminder email sent to " . $to_email . "<br>";
        } else {
            echo "Error sending email to " . $to_email . "<br>";
        }
    }
} else {
    echo "No users found.";
}

// Close database connection
mysqli_close($conn);
?>
