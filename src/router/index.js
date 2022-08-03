const { Router } = require('express');
const path = require('path');
const {check} = require('express-validator')
const UserController = require('../controllers/usersController');
const authMiddleware = require("../middleware/authMiddleware.js");
const roleMiddleware = require('../middleware/roleMiddleware');

const router = Router();

router.get('/', (req, res) => { res.sendFile(views('index.html')) })
router.get('/allUsers', roleMiddleware(["user", "admin", "editor"]), UserController.getAll)
router.post('/registration', UserController.registration)
router.post('/authorization', UserController.authorization)

const views = (name) => {
  return path.resolve(__dirname, '..', '..', 'data', 'views', name)
}

module.exports = router;