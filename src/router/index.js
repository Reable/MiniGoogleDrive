const { Router } = require('express');
const path = require('path');
const UserController = require('../controllers/usersController');

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(views('index.html'))
})
router.post('/registration', UserController.registration)

const views = (name) => {
  return path.resolve(__dirname, '..', '..', 'data', 'views', name)
}

module.exports = router;