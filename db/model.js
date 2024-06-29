const Sequelize = require('sequelize');
const db = new Sequelize('urlshortdb', 'urluser', 'urlpass', {
    host: 'localhost',
    dialect: 'mysql'
});

const Urls = db.define('url', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    shortUrl: {
        type: Sequelize.DataTypes.STRING,
        unique: true
    },
    fullUrl: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    }
});

module.exports = { db, Urls };
