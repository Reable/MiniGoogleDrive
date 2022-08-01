const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../config')

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" })
    }
    const decodeData = jwt.verify(token, SECRET_KEY)
    req.user = decodeData;
    next()
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Пользователь не авторизован" })
  }
}