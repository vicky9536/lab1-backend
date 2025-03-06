const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Consumer = require('./consumer')(sequelize, DataTypes);
const Restaurant = require('./restaurant')(sequelize, DataTypes);
const Dish = require('./dish')(sequelize, DataTypes);

sequelize.sync()
    .then(() => console.log("Database synchronized"))
    .catch(err => console.error("Database sync error:", err));

module.exports = {
    sequelize,
    Consumer,
    Restaurant,
    Dish
};