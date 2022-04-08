const router = require('express').Router()
const Chat = require('../database/db')

router.route('/').get(async(req,res)=>{
    const messages = await Chat.find()

    res.status(200).json(messages)
})

router.route('/postmessage').post(async(req,res)=>{
    const{message,received,timestamp,name} = req.body
    try {
        const createMessage = await Chat({
            message,
            timestamp,
            name,
            received
        })

        const result = await createMessage.save()

        res.status(201).json({message:"message was added successfully",data:result})
    } catch (err) {
        console.log(err)
    }

})




module.exports = router



