const multer = require('multer');
const { pathFile } = require('../../config.js')
const fs = require('fs')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (!fs.existsSync(`${pathFile}/${req.user.id}`)) {
      fs.mkdirSync(`${pathFile}/${req.user.id}`, {recursive: true})
    }
    cb(null, `${pathFile}/${req.user.id}`)
  },
  filename(req, file, cb) {
    cb(null, file.originalname)
  }
})

// const types = ['image/png', 'image/jpeg', 'image/jpg'];

// const fileFilter = (req, file, cb) => {
//   if (types.includes(file.mimetype)){
//     cb(null, true);
//   } else {
//     cb(null, false)
//   }
// }

module.exports = multer({storage})