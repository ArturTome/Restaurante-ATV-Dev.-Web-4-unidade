const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = require('./cliente.model');
const Mesa = require('./mesa.model');

const Reserva = sequelize.define('Reserva', {
    data_reserva: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Reserva.belongsTo(Cliente, { foreignKey: 'cliente_id', onDelete: 'CASCADE' });
Reserva.belongsTo(Mesa, { foreignKey: 'mesa_id', onDelete: 'CASCADE' });

module.exports = Reserva;
