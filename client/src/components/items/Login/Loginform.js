import { Button } from '@material-ui/core'
import React from 'react'
import './loginform.css'
import { auth,provider } from '../../../firebase'
import useGlobal from '../contextapi/Context'
const Loginform = ()=> {
    const{user,setuser} = useGlobal()
    const signIn = ()=>{
        auth.signInWithPopup(provider)
            .then((result)=>setuser(result.user))
            .catch((err)=>console.log(err))
    }

    return (
        <div className="login__container">
            <div className="login__top">
                <div className="login__logo">
                    <img src="https://logos-world.net/wp-content/uploads/2020/05/Logo-WhatsApp.png" alt="logo"/>
                </div>
            </div>
            <div className="login__bottom">
                <div className="login__text">
                    <h1>Welcome to whatsapp</h1>
                </div>
                <Button className="login__btn" onClick={signIn} color="primary">Signin with Google</Button>
            </div>
        </div>
    )
}

export default Loginform
