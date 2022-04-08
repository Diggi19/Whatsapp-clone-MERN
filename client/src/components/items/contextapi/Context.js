import React from 'react'

const Appcontext = React.createContext()

export const AppProvider = ({children})=>{
    const[user,setuser] = React.useState(null)
    const [messages,setmessages] = React.useState([])

    return(
        <Appcontext.Provider value={{
            user,
            setuser,
            messages,
            setmessages
        }}>
            {children}
        </Appcontext.Provider>
    )
}

const useGlobal = ()=>{
    return React.useContext(Appcontext)
}

export default useGlobal