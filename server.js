const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationsRoutes.js");
const sequelize = require("./config/database.js");
const { notFound, errorHandler } = require("./middleware/errorHandler.js");
const policyRoutes = require("./routes/policyRoutes.js");
const signedLettersRoutes = require("./routes/signedLettersRoutes.js");

const app = express();
const PORT_URL = process.env.PORT || 8080;
const allowedOrigins = [
  "https://green-ocean-080f7b703.5.azurestaticapps.net",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];

// Middlewares
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error("Not allowed by CORS")); // Deny the origin
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", applicationRoutes);
app.use("/api", policyRoutes);
app.use("/api", signedLettersRoutes);
app.use(notFound);
app.use(errorHandler);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected and synced");
    // app.listen(PORT_URL, () => {
    app.listen(PORT_URL, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT_URL}`);
    });
  })
  .catch((error) => console.log("Error connecting to database:", error));
