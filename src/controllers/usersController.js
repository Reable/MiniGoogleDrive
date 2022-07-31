const { Users } = require("../db");
const { sendErrorValidate } = require("../utils/error");
const validateData = require("../utils/validate");
const uuid = require("uuid")

async function registration (req, res) {
  if (!req.body.email || !req.body.password) {
    const err = !req.body.email 
      ? {error: "email", message: "Вы не ввели почту"} 
      : {error: "password", message: "Вы не ввели пароль"} 
    
    return res.setHeader("Content-type", "application/json").status(402).json(err)
  }
  // const usersAll = await Users.findAll();
  // const id = usersAll.length === 0 ? 1 : Number(usersAll[usersAll.length - 1].id) + 1
  const user = await Users.create({...req.body, role: "user"})
  return res.status(201).json(user);
}

async function authorization (req, res) { }

async function getOne (req ,res) { }

async function remove () { }

async function banned () { }

module.exports = {
  registration, authorization, remove, banned, getOne
}