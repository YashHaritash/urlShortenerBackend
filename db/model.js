const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
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
