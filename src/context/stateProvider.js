// Main supply of context
// these are the hooks: createContext, useContext, useReducer
import React, {createContext, useContext, useReducer} from 'react'

export const StateContext = createContext()
// children is our component
export const StateProvider = ({reducer, initialState, children} ) => (
    // value is the prop
    // Here, we are rendering this, so it must be within ()
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);
// this is our custom hook
// Everytime, you don't need to import useContext and pass the context name
// you can use this custom hook to dispatch and use all the child parameters inside this
export const useStateValue = () => useContext(StateContext)