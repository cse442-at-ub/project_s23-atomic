<?php
// Set the time zone to your desired time zone
date_default_timezone_set('America/New_York');

// Set the desired time for the email to be sent in 24-hour format (e.g. "14:30")
$send_time = '14:30';

// Get the current date and time
$current_time = date('H:i');

// If the current time matches the desired send time, send the email
if ($current_time == $send_time) {
    // Set the recipient email address
    $recipient_email = "recipient@example.com";

    // Set the email subject
    $subject = "Email Subject";

    // Set the email message
    $message = "Email Message";

    // Set the email headers
    $headers = "From: sender@example.com\r\n";
    $headers .= "Reply-To: sender@example.com\r\n";
    $headers .= "Cc: cc@example.com\r\n";
    $headers .= "Bcc: bcc@example.com\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send the email
    mail($recipient_email, $subject, $message, $headers);
}
?>
