'use strict';
const { Model } = require('sequelize');
const { Restaurant } = require('.');

module.exports = (sequelize, DataTypes) => {
    class Dish extends Model {}

    Dish.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Restaurants',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'Dish',
        tableName: 'dishes',
    }
    );

    return Dish;
};

Restaurant.hasMany(Dish, { foreignKey: 'restaurantId' });
Dish.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
