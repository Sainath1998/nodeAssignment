require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABSE_URL)
const db = mongoose.connection
db.on('error',(err)=>{
    console.log(error)
})
db.once('open',()=>{
    console.log('Database connected')
})
app.use(express.json())

const employeRouter = require('./routes/employeeRoute')
app.use('/employeeRoute',employeRouter)
app.listen(3000,()=>{
    console.log("app running on port 3000")
})