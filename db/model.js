const Sequelize = require('sequelize');
const db = new Sequelize('urlshortdb','urluser','urlpass',{
    host : 'localhost',
    dialect : 'mysql'
})

// db.authenticate().then(()=>{
//     console.log("Success");
// })
// working fine

const Urls = db.define('url',{
    id : {
        type : Sequelize.DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },

    shortUrl : {
        type : Sequelize.DataTypes.STRING,
        primaryKey : true
    },

    fullUrl : {
        type : Sequelize.DataTypes.STRING
    }

})

module.exports = {
    db,Urls
}