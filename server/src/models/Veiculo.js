const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Veiculo', {
  placa: { type: DataTypes.STRING, allowNull: false },
  chassi: { type: DataTypes.STRING, allowNull: false },
  renavam: { type: DataTypes.STRING, allowNull: false },
  modelo: { type: DataTypes.STRING, allowNull: false },
  marca: { type: DataTypes.STRING, allowNull: false },
  ano: { type: DataTypes.INTEGER, allowNull: false }
});