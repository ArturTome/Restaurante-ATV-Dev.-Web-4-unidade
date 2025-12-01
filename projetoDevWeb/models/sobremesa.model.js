const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sobremesa = sequelize.define('sobremesa', {
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

module.exports = PratoPrincipal;
