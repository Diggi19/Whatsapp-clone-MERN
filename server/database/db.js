const mongoose = require('mongoose')

const chatSchema =  mongoose.Schema({
    message:String,
    timestamp:String,
    name:String,
    received:Boolean
})

const Chat = new mongoose.model('chat',chatSchema)

module.exports = Chat