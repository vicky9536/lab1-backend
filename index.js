require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');

const consumerAuthRoutes = require('./routes/consumerAuthRoutes');
const restaurantAuthRoutes = require('./routes/restaurantAuthRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/authC', consumerAuthRoutes);
app.use('/authR', restaurantAuthRoutes);

// Database connection and sync
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Models synchronized...');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

const PORT = process.env.PORT || 8383;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
