const Sequelize = require('sequelize');
const db = require('./index');

const historicalData = db.define('historicalData', {
    symbol: {type: Sequelize.STRING, allowNull: false},
    open: Sequelize.FLOAT,
    high: Sequelize.FLOAT,
    low: Sequelize.FLOAT,
    close: Sequelize.FLOAT,
    volume: Sequelize.BIGINT,
    counter: Sequelize.INTEGER
} );

module.exports = historicalData;