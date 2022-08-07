const path = require('path')
const { pathFile } = require('../../../config.js')
const { Users, File } = require('../../db')

const filepath = (id, name) => {
  return path.join(__dirname, '..', '..', '..', 'public','files',id,name)
}

class FileController {
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

  async download(req, res) {
    return res.download(filepath(req.params.id, req.params.filename))
  }
}

module.exports = new FileController;