import { Avatar, Button, InputBase } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import {db} from '../../../firebase'
import React from 'react'
import Contact from '../contacts/Contact';
import './sidebar.css'
import useGlobal from '../contextapi/Context';
const Sidebar = ()=> {
    const[rooms,setrooms] = React.useState([])
    const{user}=useGlobal()
    const createChat = ()=>{
        const roomname = prompt("Enter chat name")
        if (roomname) {
           db.collection('rooms').add({
               name:roomname
           }) 
        }
    }

    React.useEffect(()=>{
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot)=>{
            setrooms(snapshot.docs.map((doc)=>({
                id:doc.id,
                data:doc.data()
            })))
        })

        return()=>{
            unsubscribe() // clean up function
        }
    },[])

    
    return (
        <div className="side__container">
            <div className="side__header">
                <div className="side__avatar">
                    <div><Avatar alt="Remy Sharp" src={user?.photoURL} /></div>
                    <div><h3>{user?.displayName}</h3></div>
                    
                </div>
                <div className="side__headbtns">
                    <IconButton className="side__deco"><DonutLargeIcon/></IconButton>
                    <IconButton><ChatIcon /></IconButton>
                    <IconButton><MoreHorizIcon className="side__indibtn"/></IconButton>
                </div>
            </div>
            <div className="side__search">
                <div className="side__searchicon">
                    <SearchIcon />
                </div>
                <div className="side__searchfield">
                    <InputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                {/* <div><Button variant="contained" className="side__searchbtn"><h4>Search</h4></Button></div> */}
            </div>
            <div className="side__contacts">
                <h3 onClick={createChat} className="chat__create">Add new chat</h3>
                <div className="contact__scroll">
                    {rooms.map((room)=>{
                        return(
                            <Contact key={room.id} {...room}/>
                        )
                    })}
                </div>

                

            </div>

        </div>
    )
}

export default Sidebar
