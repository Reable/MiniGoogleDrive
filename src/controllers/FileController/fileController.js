const path = require('path')
const { pathFile } = require('../../../config.js')
const { Users, File } = require('../../db')

class FileController {
  async uploadFile(name, req, res, next) {
    
    next()
  }

  async addFile(req, res){
    try{
      console.log('hello');
      if (req.file) {
        return res.json(req.file)
      }

    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Upload error" })
    }
  }
}

module.exports = new FileController;