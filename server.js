const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (your HTML, CSS, JS) from the 'public' directory
app.use(express.static('public'));

app.post('/submitForm', (req, res) => {
  const { firstName, lastName, dob, birthTime, phoneNumber, email, selectedDate, selectedTime } = req.body;

  // Astrologer's email address
  const astrologerEmail = 'apal707662@gmail.com';  // Replace with astrologer's email address

  // Compose email message for the astrologer
  const astrologerMessage = `
    New Consultation Booking:

    Name: ${firstName} ${lastName}
    Date of Birth: ${dob}
    Birth Time: ${birthTime}
    Phone Number: ${phoneNumber}
    Email: ${email}
    Selected Date: ${selectedDate}
    Selected Time: ${selectedTime}
  `;

  // Compose email message for the user
  const userMessage = `
    Dear ${firstName} ${lastName},

    Thank you for booking a consultation with us. We have received your request for a consultation on ${selectedDate} at ${selectedTime}. Our astrologer will get in touch with you shortly.

    Best regards,
    Astrology Consultation Team
  `;

  // Set up nodemailer to send emails
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'apal707662@gmail.com',  // Replace with your Gmail email address
      pass: 'aP123456$%#di',           // Replace with your Gmail password
    },
  });

  const astrologerMailOptions = {
    from: 'apal707662@gmail.com',      // Replace with your Gmail email address
    to: astrologerEmail,
    subject: 'New Consultation Booking',
    text: astrologerMessage,
  };

  const userMailOptions = {
    from: 'apal707662@gmail.com',      // Replace with your Gmail email address
    to: email,
    subject: 'Consultation Booking Confirmation',
    text: userMessage,
  };

  // Send emails
  transporter.sendMail(astrologerMailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email to astrologer:', error);
    } else {
      console.log('Email sent to astrologer:', info.response);
    }
  });

  transporter.sendMail(userMailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email to user:', error);
    } else {
      console.log('Email sent to user:', info.response);
    }
  });

  // Redirect to success page
  res.redirect('/success.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
