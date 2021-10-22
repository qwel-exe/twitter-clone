import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import "./App.css";
import Signup from './SignUp/Signup';
import Login from "./Login/Login/Login";
import { useContext, useEffect } from 'react';
import { AuthContext, FireBaseContext } from './FireBaseContext';
import HomeScreen from "./HomeScreen";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

function App() {
 
  const {user, setUser} = useContext(AuthContext)
const {firebase} = useContext(FireBaseContext)
 useEffect(() => {
  firebase.auth().onAuthStateChanged((user)=>{
    setUser(user)
  })}
)
  return (
    <div className="app">
      <Router>

      <Route  path="/signup"><Signup></Signup></Route>
   
        <Route exact path="/"> <HomeScreen/></Route>
        {user? <Redirect to='/' path="/twitter"></Redirect>:<Redirect to='/signup' path="/twitter"></Redirect>}
     
        <Route path="/login"><Login></Login></Route>
      
        </Router> 
    </div>
  );
}

export default App;
