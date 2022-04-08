// modules
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const testRoute = require('./routes/testRouter')
const chatRoute = require('./routes/chatRoutes')


// connect db
require('./connection/connect')


// server config
const app = express()
const port = process.env.PORT || 9000



// middleware setup
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
// this will set access to server from perticulat domain only ,'*' means access from any domain
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin",'*')
//     res.setHeader("Access-Control-Allow-Headers","*")
//     next()
// })

//routes
app.use('/chat',chatRoute)
app.use('/test',testRoute)

// create server
app.listen(port,()=>console.log(`listening at port ${port}`))