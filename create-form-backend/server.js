const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define your nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "chaitanya81082430@gmail.com", // Replace with your email
    pass: "dpcz qgtn naie pbwj", // Replace with your app password (or regular password if 2FA is not enabled)
  },
});

app.post("/send-message", (req, res) => {
  const { name, email, message } = req.body;

  console.log("Form data received:", { name, email, message });

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

  const mailOptions = {
    from: email, // Use the email provided by the user
    to: "chaitanya81082430@gmail.com", // Replace with your recipient email
    subject: `Message from ${name}`,
    text: message,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Message sent successfully");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
