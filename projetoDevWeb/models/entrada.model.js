const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Entrada = sequelize.define('entrada', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ingredientes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Entrada;
