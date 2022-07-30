const { Users } = require("../db");

async function getAll(req, res){
  const allUsers = await Users.findAll();
  res.json({
    users: allUsers,
  })
}

async function create () {
  
}

async function update () {
  
}

async function getOne () {
  
}

async function remove () {
  
}

module.exports = {
  getAll, create, remove, getOne, update
}