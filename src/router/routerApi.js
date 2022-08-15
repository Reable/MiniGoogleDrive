const path = require('path');
const { Router } = require('express');

//Middleware
const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require("../middleware/authMiddleware.js");

//Controllers
const FileController = require('../controllers/fileController');
const UserController = require('../controllers/usersController');

const routerApi = Router();

// Check auth
routerApi.get('/checkAuth', authMiddleware, UserController.check);

// Users route
routerApi.post('/registration', UserController.registration);
routerApi.post('/authorization', UserController.authorization);
routerApi.get('/personal', authMiddleware, UserController.personalArea);
routerApi.get('/users', roleMiddleware(["admin", "editor"]), UserController.getAll);
routerApi.get('/remove/:id', roleMiddleware(["admin", "editor"]), UserController.remove);


//File route
routerApi.get('/files',authMiddleware,FileController.files)
routerApi.get('/download/:id/:filename', FileController.download)
routerApi.post('/addFile', authMiddleware, FileController.addFile);
routerApi.post('/deleteFile', authMiddleware, FileController.deleteFile);

const views = (name) => {
  return path.resolve(__dirname, '..', '..', 'public', 'views', name)
}

module.exports = routerApi;