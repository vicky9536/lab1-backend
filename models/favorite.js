'use strict';
const { Model } = require('sequelize');
const { Consumer } = require('.');
const { Restaurant } = require('.');

module.exports = (sequelize, DataTypes) => {
    class Favorite extends Model {}

    Favorite.init({
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
        modelName: 'Favorite',
        tableName: 'favorites',
    }
    );

    return Favorite;
};

// Favorite.belongsTo(Consumer, { foreignKey: 'consumerId' });
// Consumer.hasMany(Favorite, { foreignKey: 'consumerId' });

// Favorite.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
