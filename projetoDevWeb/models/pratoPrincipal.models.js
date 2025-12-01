const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PratoPrincipal = sequelize.define('pratoPrincipal', {
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
