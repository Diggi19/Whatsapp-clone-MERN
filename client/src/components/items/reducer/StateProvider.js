import React, { useContext, useReducer } from "react"



export const StateContext = React.createContext()

export const stateProvider = ({reducer,initialstate,children})=>(
    <StateContext.Provider
        value={useReducer,initialstate,reducer}>
        {children}
    </StateContext.Provider>
)

export const useStateValue = ()=> useContext(StateContext)