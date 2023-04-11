<!DOCTYPE html>
<html>
<head>
	<title>Send Email Reminder</title>
</head>
<body>
	<?php
	if(isset($_POST['submit'])) {
		$recipient_email = $_POST['recipient_email'];
		$subject = $_POST['subject'];
		$message = $_POST['message'];
		$headers = "From: Atomic_Habits@example.com\r\n";
		$headers .= "Reply-To: yourname@example.com\r\n";
		$headers .= "CC: anotheremail@example.com\r\n";
		$headers .= "BCC: hiddenemail@example.com\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=utf-8\r\n";
		if(mail($recipient_email, $subject, $message, $headers)) {
			echo "<p>Reminder sent to $recipient_email</p>";
		} else {
			echo "<p>Error sending reminder</p>";
		}
	}
	?>
	<form method="post" action="">
		<label for="recipient_email">Recipient's Email:</label>
		<input type="email" name="recipient_email" required>
		<br>
		<label for="subject">Subject:</label>
		<input type="text" name="subject" required>
		<br>
		<label for="message">Message:</label>
		<textarea name="message" rows="10" cols="50" required></textarea>
		<br>
		<input type="submit" name="submit" value="Send Reminder">
	</form>
</body>
</html>
