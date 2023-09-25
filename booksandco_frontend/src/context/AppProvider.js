import React, { createContext, useEffect } from "react";
import { useReducer } from "react";

const dispatchContext = createContext();
const stateContext = createContext();

const initialState = {
  cartItems: [],
  isAuthenticated:false, //add isAuthenticated state
  token:null
};
const reducer = (state, action) => {
  switch (action.type) {
    case "add to cart":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        
        

       
      };

      case "login":
        return{
          ...state,
          isAuthenticated:true,
          token:action.payload  // Set authToken on login
        };

      case "logout":
        return{
          ...state,
          isAuthenticated:false,
          token:null   // Clear authToken on logout

        }  
    default: {
      return state;
    }
  }
};
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("suoper state is ", state);
  useEffect(()=>{
    // Check for an existing auth token (e.g., from localStorage)
    const storedAuthToken = localStorage.getItem("token")
    console.log("hehehehheeh",storedAuthToken)
   
    if(storedAuthToken){
       // If an auth token exists, set it and mark the user as authenticated
      dispatch({type: "login" , payload: storedAuthToken})
    }
  },[])

  return (
    <dispatchContext.Provider value={dispatch}>
      <stateContext.Provider value={state}>{children}</stateContext.Provider>
    </dispatchContext.Provider>
  );
}

export { AppProvider, dispatchContext, stateContext };
