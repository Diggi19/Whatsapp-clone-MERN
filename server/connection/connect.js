const mongoose = require('mongoose')
const Pusher = require('pusher')
const dotenv = require('dotenv').config()


const pusher = new Pusher({    // pusher config
    appId: "1275573",
    key: "7baee92fb56073ae0330",
    secret: "19aff2977c11a24bd7b3",
    cluster: "ap2",
    useTLS: true
});
mongoose.connect(process.env.connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
    .then(()=>console.log('data base connected successfully'))
    .catch((err)=>console.log(err))


const db = mongoose.connection // checks if its connected

db.once('open',()=>{
    console.log('db is connected')

    const msgCollection = db.collection('chats')
    const changestream = msgCollection.watch() // creating chnage stream
    changestream.on('change',(change)=>{
        console.log(" a change occured",change)

        if (change.operationType === 'insert') {   // if operationType is insert
            const messageDetails = change.fullDocument   // we get the document of fullDocument
            pusher.trigger('messages','inserted',{        // trigger pusher and pass the name and message from fullDocument
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received

            })
        }else{
            console.log('error triggering pusher')
        }
    })
})