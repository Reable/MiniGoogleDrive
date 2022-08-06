const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../config')
const { Users } = require('../db')

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.status(403).json({ error: 'alert', message: "Пользователь не авторизован" })
    }
    const decodeData = jwt.verify(token, SECRET_KEY)

    const user = await Users.findOne({where: {id:decodeData.id}})
    if (!user) {
      return res.status(403).json({ error: 'alert', message: "Такого пользователя не существует" })
    }

    req.user = decodeData;
    next()
  } catch (e) {
    console.log(e);
    return res.status(403).json({ error: 'alert', message: "Пользователь не авторизован" })
  }
}