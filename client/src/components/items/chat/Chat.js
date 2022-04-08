import { Avatar, IconButton, InputBase } from '@material-ui/core'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchIcon from '@material-ui/icons/Search';
import ChatIcon from '@material-ui/icons/Chat';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import React from 'react'
import './chat.css'
import { Link, useParams } from 'react-router-dom';
import firebase from 'firebase';
import Message from '../Message/Message';
import { db } from '../../../firebase';
import useGlobal from '../contextapi/Context';
import axios from 'axios';
const Chat = () => {
    const{user} = useGlobal()
    // const[messages,setmessages] = React.useState([])
    const{messages,setmessages}= useGlobal()
    const[text,settext] = React.useState('')
    const {id} = useParams()
    const handlesubmit = (e) =>{
        e.preventDefault()
        axios.post("http://localhost:9000/chat/postmessage",{
            message:text,
            name:user?.displayName,
            timestamp:new Date().toUTCString(),
            received:true
        })

        // db.collection('rooms').doc(id).collection('messages').add({
        //     message:text,
        //     name:user.displayName,
        //     timestamp:firebase.firestore.FieldValue.serverTimestamp()

        // })
        settext('')
    }
    
    const[roomname,setroomname] = React.useState('')
    React.useEffect(()=>{
        if (id) {
            const unsubscribe = db.collection('rooms').doc(id).onSnapshot((snapshot)=>{
                setroomname(snapshot.data()?.name)


            })
            db.collection('rooms').doc(id).collection('messages')
                .orderBy('timestamp','asc').onSnapshot((snapshot)=>{
                    setmessages(snapshot.docs.map((doc)=>doc.data()))
                })


                return()=>{
                    unsubscribe()
                }
        }
    },[id])

    return (
        <div className="chat__container">
            <div className="chat__header">
                <div className="chat__info">
                    <Link to="/"><div className="chat__backbtn"><ArrowBackIosIcon/></div></Link>
                    <div><Avatar alt="Remy Sharp" src={`https://avatars.dicebear.com/api/human/${id}.svg`} /></div>
                    <div className="chat__userinfo">
                        <div className="chat__username"><h3>{roomname}</h3></div>
                        {/* <div><h4>{new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()}</h4></div> */}
                    </div>
                </div>
                <div className="chat__btn">
                    <IconButton className="side__deco"><SearchIcon /></IconButton>
                    <IconButton><AttachFileIcon /></IconButton>
                    <IconButton><MoreHorizIcon className="side__indibtn"/></IconButton>
                </div>
            </div>
            <div className="chat__area">
                <div className="chat__scrollchats">
                    {console.log(messages)}
                    {messages.map((message)=>{
                        return(
                            <Message message={message}/>
                        )
                    })}
                </div>
            </div>
            <div className="chat__field">
                <div className="chat__emojiicon">
                    <EmojiEmotionsIcon />
                </div>
                <div className="chat__textfield">
                    <div className="textfield__holder">
                        <form method="POST" onSubmit={handlesubmit}>
                            <InputBase
                            className="textfield"
                            value={text}
                            onChange={(e)=>settext(e.target.value)}
                            placeholder="Type a message…"
                            inputProps={{ 'aria-label': 'search' }}
                            />
                            {/* <button className="send__btn" type="submit"><SendIcon className="sendicon"/></button> */}
                        </form>
                    </div>
                </div>
                <div className="chat__othericons">
                    <AttachFileIcon  className="attachicon"/>
                    <CameraAltIcon className="cameraicon"/>
                </div>
            </div>

        </div>
    )
}

export default Chat
