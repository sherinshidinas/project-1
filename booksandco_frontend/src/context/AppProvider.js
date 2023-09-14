import React, { createContext } from 'react'
import { useReducer } from 'react'

const dispatchContext=React.createContext()
const stateContext=React.createContext()

const initialState={
   cartItems:[]
   
}
const reducer=(state,action)=>{
   
  switch(action.type){
    case "add to cart":
        return {
             ...state, cartItems:[...state.cartItems,action.payload]
            }
    default: {
        return state
    }
  }
}
function AppProvider({children}) {
   
    const [state,dispatch]=useReducer(reducer,initialState)
    console.log("suoper state is ",state)
   
  return (
   
    <dispatchContext.Provider value={dispatch}>
        <stateContext.Provider value={state}>
                    {children}
        </stateContext.Provider>
    </dispatchContext.Provider>
  )
}

export{AppProvider,dispatchContext,stateContext}