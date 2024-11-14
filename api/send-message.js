// api/send-message.js

const nodemailer = require("nodemailer");

export default async (req, res) => {
  // Ensure the method is POST
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Validate the input data
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a transporter for sending the email
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can replace this with any email service
      auth: {
        user: process.env.EMAIL_USER, // The email you want to send from
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    const mailOptions = {
      from: email, // From the email provided by the user
      to: process.env.EMAIL_USER, // The email where the message should be sent
      subject: `New Message from ${name}...`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: "Message sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Error sending message." });
    }
  } else {
    // If the request method is not POST, return Method Not Allowed
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
