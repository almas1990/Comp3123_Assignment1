
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const app = express();
const employeeRoutes = require("./routes/employeeRoutes");
const rateLimit = require("express-rate-limit");

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
const logsDirectory = path.join(__dirname, "logs");

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory, { recursive: true });
}

const accessLogStream = fs.createWriteStream(
  path.join(logsDirectory, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    message: "Too many requests, please try again later."
  }
});

app.use("/api/v1", apiLimiter);
app.use("/api/v1/user", authRoutes);
app.use("/api/v1/emp", employeeRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to COMP3123 Assignment 1 API"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running"
  });
});
app.get("/api/v1/protected", protect, (req, res) => {
  res.status(200).json({
    message: "You are authorized",
    username: req.user.username
  });
});
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
