const fs = require('fs')
const path = require('path')
const { Users, File } = require('../db')

const filepath = (id, name='') => {
  return path.join( __dirname,'..', '..', 'public','files',String(id),name)
}

class FileController {
  async addFile(req, res){
    try{
      const file = req.files.file

      if(!file) {
        return res.status(400).json({error:'alert', message: "File is required" })
      }
      
      let [ filename, typefile ] = file.name.split('.');
      const size = (file.size / 1024) / 1024

      if (!fs.existsSync(filepath(req.user.id))){
        fs.mkdirSync(filepath(req.user.id), {recursive: true})
      }

      if (fs.existsSync(filepath(req.user.id, file.name))) {
        return res.status(400).json({error: 'alert', message:'Файл уже существует'})
      }

      fs.writeFileSync( filepath( req.user.id, file.name ),file.data, {encoding: 'utf-8'} );
      
      const user = await Users.findOne({where: {id: req.user.id}})
      user.update({
        usedSpace: Number(user.usedSpace) + Number(size),
        diskSpace: Number(user.diskSpace) - Number(size)
      })

      await File.create({
        user_id: req.user.id,
        filename: filename,
        pathfile: filepath( req.user.id, file.name ),
        size: size,
        type: typefile
      })

      return res.status(201).json({message: 'Файл создан'})
    } catch (e) {
      console.log(e);
      return res.status(500).json({error: 'alert', message: "Upload error" })
    }
  }

  async deleteFile (req, res) {

    if (!req.body.filename) return res.json({error: 'alert', message: 'Ошибка убаления файла'})

    const [filename, type] = req.body.filename.split('.')

    await fs.promises.rm(filepath(req.user.id, req.body.filename))

    const fileDelete = await File.findOne({where: {user_id: req.user.id, filename, type }})
    fileDelete.destroy()

    const user = await Users.findOne({where: {id: req.user.id}})
    user.update({
      diskSpace: Number(user.diskSpace) + Number(fileDelete.size),
      usedSpace: Number(user.usedSpace) - Number(fileDelete.size),
    })

    return res.status(200).json({error: 'none', message: 'Файл удален'})
  }

  async files(req, res){
    try {
      await fs.promises.access(filepath(req.user.id),fs.constants.F_OK)
      fs.promises.readdir(filepath(req.user.id))
        .then(files => {
          return res.status(200).json({id: req.user.id, files})
        })
    } catch (e) {
      console.log(e)
      return res.status(404).json({error: 404, message: 'Файлы не найдены'});
    }
  }

  async download(req, res) {
    return res.download(filepath(req.params.id, req.params.filename))
  }
}

module.exports = new FileController;