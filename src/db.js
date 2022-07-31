const Sequelize = require('sequelize');

const sequelize = new Sequelize("googleDrive", "root", "root", { 
  host: "localhost", 
  dialect: "mysql",
})

let Users = require('./models/users.model')(sequelize)

module.exports = {
  sequelize,
  Users
}