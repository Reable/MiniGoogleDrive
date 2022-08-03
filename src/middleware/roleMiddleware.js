const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../config')

module.exports = (roles) => {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const token = req.headers.authorization.split(" ")[1]
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" })
      }
      const decodeData = jwt.verify(token, SECRET_KEY)

      if (!roles.includes(decodeData.role)){
        return res.status(403).json({ message: `Ваша роль ${decodeData.role} а нужно иметь роли - ${roles}` })
      }

      req.user = decodeData;
      next()
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "Пользователь не авторизован" })
    }
  }
}