import { Avatar } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react'
import { Link } from 'react-router-dom';
import { db } from '../../../firebase';
import './contact.css'
const Contact = ({data,id})=> {
    const[seed,setseed] = React.useState('')
    const[messages,setmessages] = React.useState("")
    // const deletechat = (id)=>{
    //     console.log(id)
    //     if (id) {
    //         db.collection('rooms').doc('id').delete()
    //     }
    // }



    React.useEffect(()=>{
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot)=>{
                setmessages(snapshot.docs.map((doc)=>doc.data()))
            })
            
        }
    
    },[id])

    return (
        <div key={id} className="contact__container">
            <Link to={`/app/${id}`} className="contact__container">
                <div className="contact__info">
                    <div className="contact__avatar"><Avatar alt="Remy Sharp" src={`https://avatars.dicebear.com/api/human/${id}.svg`} /></div>
                    <div className="contact__sideinfo">
                        <div className="contact__username">
                            <h4>{data.name}</h4>
                        </div>
                        <div className="contact__last">
                            <h4>{messages[0]?.message}</h4>
                        </div>
                    </div>
                    {/* <div className="contact__lastmessage">last </div> */}
                </div>
                <div className="contact__btn">
                    {/* <DeleteIcon className="delete__icon" /> */}
                </div>
            </Link>
        </div>
    )
}

export default Contact
