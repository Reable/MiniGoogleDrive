const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/router');
const { sequelize } = require('./src/db');

const app = express()

app.use(bodyParser.json());

app.use("/api", router)


// sequelize.sync({force:true})
sequelize.sync()
  .then(result => {
    app.listen(3001, () => {
      console.log("Server is running");
    })
  })
  .catch(err => {
      console.log(err);
  });
