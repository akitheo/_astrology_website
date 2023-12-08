const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
  // Extract form data
  const { firstName, lastName, dob, birthTime, phoneNumber, email } = req.body;

  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'apal707662@gmail.com', // Replace with your Gmail email address
      pass: 'aP123456$%#di', // Replace with your Gmail password
    },
  });

  // Email content
  const mailOptions = {
    from: 'apal707662@gmail.com', // Replace with your Gmail email address
    to: 'apal707662@gmail.com', // Replace with the astrologer's email address
    subject: 'New Consultation Booking',
    html: `
      <p>Name: ${firstName} ${lastName}</p>
      <p>Date of Birth: ${dob}</p>
      <p>Birth Time: ${birthTime}</p>
      <p>Phone Number: ${phoneNumber}</p>
      <p>Email: ${email}</p>
    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent:', info.response);
      res.sendFile(__dirname + '/success.html'); // Redirect to a success page
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
