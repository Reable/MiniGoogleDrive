const express = require('express')

const app = express()

app.listen(3001,()=>{
  console.log('Server is running port 3001')
})

app.get('/api/test',(req,res)=>{
  res.json({
    message: 'test '
  })
})

app.get('/api',(req,res)=>{
  res.json({
    message:' Hellow tadadaddadasest)'
  })
})

