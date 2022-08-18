const Sequelize = require('sequelize');

const sequelize = new Sequelize("googleDrive", "mysql", "mysql", { 
  host: "localhost", 
  dialect: "mysql",
})

let Users = require('./models/users.model')(sequelize)
let File = require('./models/file.model')(sequelize)

module.exports = {
  sequelize,
  Users,
  File
}