import {createContext, useState} from 'react'
import React from 'react';
export const FireBaseContext = createContext(null);


export const AuthContext = createContext(null);


export default function Context({children}){
    const [user, setUser] = useState(null)

    return(
        <AuthContext.Provider value={{user, setUser}}>
          {children}
        </AuthContext.Provider>
    )
}