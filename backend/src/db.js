const Sequelize = require('sequelize');

const sequelize = new Sequelize("googleDrive", "root", "root", { 
  host: "localhost", 
  dialect: "mysql",
})

let Users;

async function connectModel () {
  Users = require('./models/users.model')(sequelize)

  await sequelize.sync();
}
connectModel();

module.exports = {
  sequelize,
  Users
}