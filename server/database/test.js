const mongoose = require('mongoose')

const testSchema =  mongoose.Schema({
    chat:String,
    messages:[
        {
            message:String,
            timestamp:String,
            name:String
        }
    ]
})

const Test = new mongoose.model('test',testSchema)

module.exports = Test