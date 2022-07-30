const { Router } = require('express');
const UserController = require('../controllers/usersController');

const router = Router();

router.get('/api/users', UserController.getAll)

module.exports = router;