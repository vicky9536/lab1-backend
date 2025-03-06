const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Consumer = require('./consumer')(sequelize, DataTypes);
const Restaurant = require('./restaurant')(sequelize, DataTypes);
const Dish = require('./dish')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);
const Cart = require('./cart')(sequelize, DataTypes);
const Favorite = require('./favorite')(sequelize, DataTypes);


sequelize.sync()
    .then(() => console.log("Database synchronized"))
    .catch(err => console.error("Database sync error:", err));

module.exports = {
    sequelize,
    Consumer,
    Restaurant,
    Dish,
    Order,
    Cart,
    Favorite
};