
import React, { createContext } from 'react';

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  return (
    <LoginContext.Provider value={props.value}>
      {props.children}
    </LoginContext.Provider>
  )
}