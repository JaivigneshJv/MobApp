require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Not Connected to database");
  });

const User = require("./models/user");
const job = require("./models/jobs");

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verify your email",
    text: `Click on the link to verify your email http://localhost:8000/verify/${verificationToken}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (err) {
    console.log(err);
    console.log("Email not sent");
  }
};
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, regno } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      regno,
    });

    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    await newUser.save();
    console.log("New User Registered:", newUser);
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.status(200).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (err) {
    console.log("error during registration", err);
    res.status(500).json({ message: err.message });
  }
});

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    const htmlResponse = `<!DOCTYPE html>
      <html>
      <head>
        <title>Email Verification</title>
      </head>
      <body>
        <p>Your email has been successfully verified. You may now close this window.</p>
      </body>
      </html>
    `;
    res.send(htmlResponse);
    res.status(200).json({ message: "Email verified" });
  } catch (err) {
    res.status(500).json({ message: "Email verification Failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};
const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "invalid email" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ email: user.email, id: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (err) {
    console.log("error during login", err);
    res.status(500).json({ message: err.message });
  }
});

app.post("/Main", async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
    console.log(token);
    const user = await User.findOne({ email: decoded.email });
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(200).json({
      email: User.email,
      name: user.name,
      regno: user.regno,
    });
  } catch (err) {
    console.log("error during login", err);
    res.status(500).json({ message: err.message });
  }
});

app.post("/jobs", async (req, res) => {
  const { Companyname, JobDescription, JobName } = req.body;
  const jobs = new job({
    Companyname,
    JobDescription,
    JobName,
  });
  jobs.save();
});

app.get("/jobfetch", async (req, res) => {
  const jobs = await job.find();
  res.send(jobs);
});

app.post("/getresume", async (req, res) => {});
