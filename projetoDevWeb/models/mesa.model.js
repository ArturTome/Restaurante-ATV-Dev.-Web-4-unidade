const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mesa = sequelize.define('Mesa', {
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lugares: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Mesa;
