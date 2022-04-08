const router = require('express').Router()
const Test = require('../database/test')

router.route('/').get(async(req,res)=>{
    const messages = await Test.find()

    res.status(200).json(messages)
})

router.route('/testmessage').post(async(req,res)=>{
    const{chat,message,timestamp,name} = req.body
    try {

        const findexisting = await Test.find({chat:chat})
        if (chat === findexisting.chat) {
            const updatemessage = await Test.findByIdAndUpdate({_id:findexisting._id,messages:[...messages,{message,timestamp}]})

            const result = await updatemessage.save()
            res.status(200).json({message:"message was updated successfully",data:result})

        }else{

            const createMessage = await Test({
                chat,
                messages:[{
                    message,
                    timestamp,
                    name
                }]
            })
    
            const result = await createMessage.save()
            res.status(200).json({message:"message was added successfully",data:result})
        }


    } catch (err) {
        console.log(err)
    }

})




module.exports = router



