const path = require('path');
const { Router } = require('express');

//Middleware
const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require("../middleware/authMiddleware.js");

//Controllers
const FileController = require('../controllers/FileController/fileController');
const UserController = require('../controllers/UserController/usersController');
const fileMiddleware = require('../middleware/fileMiddleware');

const routerApi = Router();

// Check auth
routerApi.get('/checkAuth', authMiddleware, UserController.check);

// Users route
routerApi.post('/registration', UserController.registration);
routerApi.post('/authorization', UserController.authorization);
routerApi.get('/users', roleMiddleware(["admin", "editor"]), UserController.getAll);
routerApi.get('/remove/:id', roleMiddleware(["admin", "editor"]), UserController.remove);

//File route
routerApi.post('/addFile', authMiddleware, fileMiddleware.single('avatar'), FileController.addFile);

const views = (name) => {
  return path.resolve(__dirname, '..', '..', 'public', 'views', name)
}

module.exports = routerApi;