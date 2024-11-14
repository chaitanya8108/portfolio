const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "chaitanya81082430@gmail.com", // Replace with your email
    pass: "dpcz qgtn naie pbwj", // Replace with your app password or email password
  },
});

const mailOptions = {
  from: "chaitanya81082430@gmail.com", // Replace with your email
  to: "chaitanya231815@gmail.com", // Replace with the recipient email
  subject: "Test Email",
  text: "This is a test email.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log("Error sending test email: ", error);
  } else {
    console.log("Test email sent successfully:", info.response);
  }
});
