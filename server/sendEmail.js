const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "paraskhilosiyapkofficial@gmail.com",
    pass: "xaft pokv yvnh youl",
  },
});

const mailOptions = {
  from: "paraskhilosiyapkofficial@gmail.com",
  to: "paras.khilosiya20@pccoepune.org",
  subject: "Hello Testing Email",
  text: "Hello from Node.js! This is the email sent to you for testing purpose",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
