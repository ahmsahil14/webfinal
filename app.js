const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Create an Express app
const app = express();
const port = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the static files (CSS, images, etc.) in the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index2.html')); // Adjust this path as needed
});

// Serve the consultation page
app.get('/consultation', (req, res) => {
  res.sendFile(path.join(__dirname, 'bookconsult.html')); // Adjust this path as needed
});
app.get('/aboutus', (req, res) => {
  res.sendFile(path.join(__dirname, 'aboutus.html')); // Adjust this path as needed
});

// Handle form submission from consultation page
app.post('/submit-consultation', (req, res) => {
  const { name, email, phone, message, preferences } = req.body;

  // Data to save to a file
  const customerData = {
    name,
    email,
    phone,
    message,
    preferences,
    submittedAt: new Date().toLocaleString(),
  };

  // Save data to a file (JSON format)
  const filePath = path.join(__dirname, 'submissions.json');
  const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
  data.push(customerData);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  // Send the email using nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',  // Replace with your Gmail
      pass: 'your-email-password',   // Replace with your Gmail app password or OAuth2 credentials
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'your-email@gmail.com', // You can change this to multiple emails if needed
    subject: 'New Consultation Request',
    text: `New consultation request:

      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
      Preferred Consultation Method: ${preferences}
      Submitted At: ${customerData.submittedAt}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error sending email:', error);
    }
    console.log('Email sent: ' + info.response);
  });

  // Respond to the user after submission
  res.send(`
    <h1>Thank you for your consultation request!</h1>
    <p>Your details have been received, and our experts will contact you soon.</p>
    <a href="/">Back to Home</a>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});