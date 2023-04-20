<?php
// Connect to the database
$servername = "oceanus.cse.buffalo.edu:3306";
$username = "argraca";
$password = "50301883";
$dbname = "cse442_2023_spring_team_q_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Fetch email addresses from the database
$sql = "SELECT email FROM users";
$result = $conn->query($sql);

// Loop through the email addresses and send an email to each one
while ($row = $result->fetch_assoc()) {
  $to = $row['email'];
  $subject = "Reminder from Habit Tracker!";
  $message = "Don't forget to log your habits on Habit Tracker!";
  $headers = "From: Atomic-habits@example.com\r\n";

  mail($to, $subject, $message, $headers);
}

// Sleep for 6 hours
sleep(6 * 60 * 60);

// Close the database connection
$conn->close();
?>
