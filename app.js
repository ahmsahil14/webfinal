const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection (adjust the URI accordingly)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error(error));

// Create routes

// Contact form route
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Send the email (using Nodemailer)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `Contact Us Form - ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message', error: err });
  }
});

// Portfolio route (CRUD for portfolio items)
const Portfolio = mongoose.model('Portfolio', {
  title: String,
  description: String,
  imageUrl: String,
});

// Add Portfolio Item
app.post('/portfolio', async (req, res) => {
  const { title, description, imageUrl } = req.body;
  try {
    const newPortfolio = new Portfolio({ title, description, imageUrl });
    await newPortfolio.save();
    res.status(201).json({ message: 'Portfolio item created' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating portfolio item' });
  }
});

// Fetch all Portfolio Items
app.get('/portfolio', async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.status(200).json(portfolios);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching portfolio items' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
