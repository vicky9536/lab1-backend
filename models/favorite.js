'use strict';
const { Model } = require('sequelize');
const Consumer = require('./consumer');
const Restaurant = require('./restaurant');

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

    Favorite.associate = (models) => {
        Favorite.belongsTo(models.Consumer, { foreignKey: 'consumerId' });
        Favorite.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' });
    };

    return Favorite;
};

//Favorite.belongsTo(Consumer, { foreignKey: 'consumerId' });
//Consumer.hasMany(Favorite, { foreignKey: 'consumerId' });

//Favorite.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
