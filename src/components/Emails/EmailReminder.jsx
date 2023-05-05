
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../Homepage/Navbar';
import './emailreminder.css'
import React, { useState } from "react";
import axios from "axios";

function EmailReminder() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("recipient_email", recipientEmail);
    data.append("email_subject", emailSubject);
    data.append("email_message", emailMessage);
    data.append("date_time", dateTime);

    try {
      const response = await axios.post("send_email.php", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <form className="container" onSubmit={handleSubmit}>
        <label htmlFor="recipient_email">Recipient Email</label>
        <input
          type="email"
          id="recipient_email"
          name="recipient_email"
          value={recipientEmail}
          onChange={(event) => setRecipientEmail(event.target.value)}
        />
        <br />

        <label htmlFor="email_subject">Email Subject</label>
        <input
          type="text"
          id="email_subject"
          name="email_subject"
          value={emailSubject}
          onChange={(event) => setEmailSubject(event.target.value)}
        />
        <br />

        <label htmlFor="email_message">Email Message</label>
        <textarea
          id="email_message"
          name="email_message"
          value={emailMessage}
          onChange={(event) => setEmailMessage(event.target.value)}
        />
        <br />

        <label htmlFor="date_time">Date and Time to Send</label>
        <input
          type="datetime-local"
          id="date_time"
          name="date_time"
          value={dateTime}
          onChange={(event) => setDateTime(event.target.value)}
        />
        <br />

        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}

export default EmailReminder;
