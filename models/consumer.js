'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

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
        hooks: {
            beforeCreate: async (consumer) => {
                if (consumer.password) {
                    consumer.password = await bcrypt.hash(consumer.password, 10);
                }
            }
        }
    }
    );

    Consumer.associate = (models) => {
        Consumer.hasMany(models.Order, { foreignKey: 'consumerId' });
        Consumer.hasMany(models.Cart,  { foreignKey: 'consumerId' });
        Consumer.hasMany(models.Favorite, { foreignKey: 'consumerId' });
    };
    
    return Consumer;
};