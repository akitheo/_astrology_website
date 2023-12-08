require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON bodies
app.use(cors());

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

// Handle form submission
app.post('/submit-form', async (req, res) => {
  try {
    // Extract form data from request body
    const formData = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'apal707662@gmail.com', // Replace with the astrologer's email address
      subject: 'New Consultation Booking',
      html: `
        <p>Name: ${formData.firstName} ${formData.lastName}</p>
        <p>Date of Birth: ${formData.dob}</p>
        <p>Birth Time: ${formData.birthTime}</p>
        <p>Phone Number: ${formData.phoneNumber}</p>
        <p>Email: ${formData.email}</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    // Respond with a success message
    res.status(200).send('Form submission successful');
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
