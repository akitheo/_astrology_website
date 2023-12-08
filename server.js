const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON bodies

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

// Handle form submission
app.post('/submit', async (req, res) => {
  try {
    // Extract form data
    const { firstName, lastName, dob, birthTime, phoneNumber, email } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,  // Corrected line
        pass: process.env.EMAIL_PASSWORD,  // Corrected line
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
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
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    // Redirect to a success page
    res.sendFile(path.join(__dirname, 'success.html'));
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
