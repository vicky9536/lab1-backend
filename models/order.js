'use strict';
const { Model } = require('sequelize');
const Consumer = require('./consumer');
const Restaurant = require('./restaurant');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {}

    Order.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        consumer_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM(
                'New',
                'Delivered',
                'Cancelled',
                'Order Received',
                'Preparing',
                'On the Way',
                'Pick-up Ready',
                'Picked Up'
            ),
            defaultValue: 'New',
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Order',
        tableName: 'orders'
    }
    );

    return Order;
};

Restaurant.hasMany(Order, { foreignKey: 'restaurant_id' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

Consumer.hasMany(Order, { foreignKey: 'consumer_id' });
Order.belongsTo(Consumer, { foreignKey: 'consumer_id' });