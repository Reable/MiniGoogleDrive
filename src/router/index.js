const { Router } = require('express');
const UserController = require('../controllers/usersController');

const router = Router();

router.post('/registration', UserController.registration)

module.exports = router;