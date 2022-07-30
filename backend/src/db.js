const Sequelize = require('sequelize');

const sequelize = new Sequelize("googleDrive", "postgres", "root", { 
  host: "localhost", 
  dialect: "postgres",
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