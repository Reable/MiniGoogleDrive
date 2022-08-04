const { Users } = require("../../db");
const { sendErrorValidate } = require("../../utils/error");
const validateData = require("../../utils/validate");
const uuid = require("uuid");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { SECRET_KEY } = require('../../../config.js')

const generateToken = (id, role) => {
  const payload = {
    id, role
  }
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" })
}

class UserController {

  async registration (req, res) {
    try {
      // const errors = validationResult(req)
      // if (!errors.isEmpty()) {
      //   return res.status(400).json(errors)
      // }
      if (!req.body.email || !req.body.password) {
        const err = !req.body.email 
        ? {error: "email", message: "Вы не ввели почту"} 
        : {error: "password", message: "Вы не ввели пароль"} 
        return res.setHeader("Content-type", "application/json").status(402).json(err)
      }

      const emailUse = await Users.findOne({where: {email: req.body.email}})
      if (emailUse) {
        return res.setHeader("Content-type", "application/json").status(402).json({error: "email", message: "данная почта уже используеться"})
      }
      const hashPassword = bcrypt.hashSync(req.body.password, 7)
      const user = await Users.create({...req.body, password: hashPassword, role: "user"})
      
      const token = generateToken(user.id, user.role);
      return res.status(201).json({ token })
    } catch (e) {
      console.log(e);
      return res.status(400).json({message: "Registration error"})
    }
  }

  async authorization (req, res) {
    try{
      if (!req.body.email || !req.body.password) {
        const err = !req.body.email 
        ? {error: "email", message: "Вы не ввели почту"} 
        : {error: "password", message: "Вы не ввели пароль"} 
        return res.setHeader("Content-type", "application/json").status(402).json(err)
      }
      const user = await Users.findOne({where: {email: req.body.email}})
      if (!user) {
        return res.setHeader("Content-type", "application/json").status(402).json({error: "email", message: "данного пользователя не существует"})
      }

      const validaPassword = await bcrypt.compare(req.body.password, user.password)
      if (!validaPassword) {
        return res.status(401).json({ messae: "Неверный пароль" })
      }
      const token = generateToken(user.id, user.role);
      return res.status(200).json({ token })
    } catch(e) {
      console.log(e);
      return res.status(400).json({message: "Authorization error"})
    }
  }

  async getAll (req ,res) {
    const allUsers = await Users.findAll();
    return res.json(allUsers)
  }

  async remove (req, res) {
    const id = req.params.id;
    const user = await Users.destroy({where: {id}})
    return res.json(user);
  }

}
module.exports = new UserController;