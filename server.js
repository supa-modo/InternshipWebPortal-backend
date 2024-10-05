const express=require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/database.js');

dotenv.config();
const app = express();
const PORT_URL = process.env.PORT || 5000

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database connected and synced');
    app.listen(PORT_URL, () => {
      console.log(`Server running on port ${PORT_URL}`);
    });
  })
  .catch((error) => console.log('Error connecting to database:', error));