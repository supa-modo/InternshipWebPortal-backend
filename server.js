const express=require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/database.js');
const { notFound, errorHandler } = require('./middleware/errorHandler.js');

const app = express();
const PORT_URL = process.env.PORT || 5000

app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

sequelize.sync()
  .then(() => {
    console.log('Database connected and synced');
    app.listen(PORT_URL, () => {
      console.log(`Server running on port ${PORT_URL}`);
    });
  })
  .catch((error) => console.log('Error connecting to database:', error));