import React,{createContext,useContext,useReducer} from "react"

//set up data layer
export const StateContext=createContext();

//build a provider
export const StateProvider=({reducer,initialState,children}) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);
export const UseStateValue = () => useContext(StateContext);