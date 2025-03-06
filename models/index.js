const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Consumer = require('./consumer')(sequelize, DataTypes);
const Restaurant = require('./restaurant')(sequelize, DataTypes);
const Dish = require('./dish')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);
const Cart = require('./cart')(sequelize, DataTypes);
const Favorite = require('./favorite')(sequelize, DataTypes);

Restaurant.hasMany(Dish, { foreignKey: 'restaurantId' });
Dish.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Restaurant.hasMany(Order, { foreignKey: 'restaurant_id' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });
Consumer.hasMany(Order, { foreignKey: 'consumer_id' });
Order.belongsTo(Consumer, { foreignKey: 'consumer_id' });
Consumer.hasMany(Cart, { foreignKey: 'consumerId' });
Cart.belongsTo(Consumer, { foreignKey: 'consumerId' });
Dish.hasMany(Cart, { foreignKey: 'dishId' });
Cart.belongsTo(Dish, { foreignKey: 'dishId' });
Favorite.belongsTo(Consumer, { foreignKey: 'consumerId' });
Consumer.hasMany(Favorite, { foreignKey: 'consumerId' });
Favorite.belongsTo(Restaurant, { foreignKey: 'restaurantId' });


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