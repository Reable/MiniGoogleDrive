const path = require('path');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const { pathFile } = require('./config');
const { sequelize } = require('./src/db');

const routePage = require('./src/router/routePage');
const routerApi = require('./src/router/routerApi.js');

const app = express()

app.use(morgan('dev'));
app.use(fileUpload({}))

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