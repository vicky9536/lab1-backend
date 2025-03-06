'use strict';
const { Model } = require('sequelize');
const Consumer = require('./consumer');
const Dish = require('./dish');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {}

    Cart.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        consumerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Consumers',
                key: 'id'
            }
        },
        dishId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Dishes',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Cart',
        tableName: 'carts',
    }
    );

    return Cart;
};

Consumer.hasMany(Cart, { foreignKey: 'consumerId' });
Cart.belongsTo(Consumer, { foreignKey: 'consumerId' });

Dish.hasMany(Cart, { foreignKey: 'dishId' });
Cart.belongsTo(Dish, { foreignKey: 'dishId' });
