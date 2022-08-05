const path = require('path');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const { sequelize } = require('./src/db');
const { pathFile } = require('./config');

const routerApi = require('./src/router/routerApi.js');
const routePage = require('./src/router/routePage');
const app = express()

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname,"public")));

app.use('/', routePage);
app.use('/api', routerApi);
app.use('/files', express.static(pathFile));

const start = () => {
  try{
    // sequelize.sync({force:true})
    sequelize.sync()
    .then(result => {
      app.listen(3000, () => console.log("Server is running"))
    })
  } catch (e){
    console.log(e);
  }
}
start()