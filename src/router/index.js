const { Router } = require('express');
const path = require('path');
const {check} = require('express-validator')
const UserController = require('../controllers/UserController/usersController');
const authMiddleware = require("../middleware/authMiddleware.js");
const roleMiddleware = require('../middleware/roleMiddleware');

const router = Router();

//Page
router.get('/', (req, res) => { res.sendFile(views('index.html')) })

// Users route
router.get('/api/users', roleMiddleware(["admin", "editor"]), UserController.getAll)
router.get('/api/remove/:id', roleMiddleware(["admin", "editor"]), UserController.remove)
router.post('/api/registration', UserController.registration)
router.post('/api/authorization', UserController.authorization)

//File route


const views = (name) => {
  return path.resolve(__dirname, '..', '..', 'data', 'views', name)
}

module.exports = router;