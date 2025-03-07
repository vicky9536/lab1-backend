'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Consumer extends Model {}

    Consumer.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'Consumer',
        tableName: 'consumers',
    }
    );

    Consumer.associate = (models) => {
        Consumer.hasMany(models.Order, { foreignKey: 'consumerId' });
        Consumer.hasMany(models.Cart,  { foreignKey: 'consumerId' });
        Consumer.hasMany(models.Favorite, { foreignKey: 'consumerId' });
    };
    
    return Consumer;
};