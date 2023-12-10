require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON bodies
app.use(cors());

// Handle form submission (updated as a function)
exports.handler = async function (event, context) {
  try {
    // Extract form data from the request body
    const formData = JSON.parse(event.body);

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
      to: 'apal707662@gmail.com',
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
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submission successful' }),
    };
  } catch (error) {
    console.error('Error processing form submission:', error);

    // Respond with an error message
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

// Export the express app (optional, depending on your needs)
module.exports = app;

// Note: The server will still run locally when you test it, but Netlify will use the exported handler function for the serverless function.
