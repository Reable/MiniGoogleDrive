const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize } = require('./src/db');

const router = require('./src/router');
const app = express()

app.use(bodyParser.json());

const start = () => {
  try{
    app.use(router);
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