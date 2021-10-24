import { createContext, useState, useEffect } from "react";
import React from "react";
import { useFirebase } from "../src/firebase";
import { authState } from "rxfire/auth";

export const FireBaseContext = createContext(null);

export const AuthContext = createContext({
  user: null,
  ready: false,
  logOut: () => {},
});

export default function Context({ children }) {
  const [user, setUser] = useState({ user: null, ready: false });
  const { auth } = useFirebase();

  const logOut = () => auth && auth.signOut();

  useEffect(() => {
    if (!auth) {
      return;
    }

    const subscription = authState(auth).subscribe((user) => {
      setUser({
        ...user,
        user,
        ready: true,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={{ ...user, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
