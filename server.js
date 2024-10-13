const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationsRoutes.js");
const sequelize = require("./config/database.js");
const { notFound, errorHandler } = require("./middleware/errorHandler.js");
const policyRoutes = require("./routes/policyroutes.js");

const app = express();
const PORT_URL = process.env.PORT || 5000;

// Middlewares
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // Allow credentials (cookies, auth headers)
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/api", applicationRoutes);
app.use("/api", policyRoutes);

app.use(notFound);
app.use(errorHandler);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected and synced");
    app.listen(PORT_URL, () => {
      console.log(`Server running on port ${PORT_URL}`);
    });
  })
  .catch((error) => console.log("Error connecting to database:", error));
