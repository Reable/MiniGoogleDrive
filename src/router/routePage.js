const path = require('path');
const { Router } = require('express');

const routePage = Router();

routePage.get('/', (req, res) => res.status(200).sendFile(views('index')));


const views = (name) => {
  return path.resolve(__dirname, '..', '..', 'public', 'views', `${name}.html`)
}

module.exports = routePage;