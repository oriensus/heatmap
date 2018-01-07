const Sequelize = require('sequelize');
const db = require('./index');

const securities = db.define('securities', {
    symbol: {type: Sequelize.STRING, allowNull: false},
    type: Sequelize.INTEGER,
    prevClose: Sequelize.FLOAT
});

module.exports = securities;