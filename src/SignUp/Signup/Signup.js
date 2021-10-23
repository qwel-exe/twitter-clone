import React from 'react';
import { useState, useContext } from 'react';
import './Signup.css';
import { FireBaseContext } from '../../FireBaseContext';
import { useHistory } from 'react-router';

export default function Signup() {
  const {firebase} = useContext(FireBaseContext);
  const history = useHistory();
 const [name, setName] = useState("");
 const [userName, setuserName] = useState("");
 const [passWord, setpassWord] = useState("");
 const [phone, setphone] = useState("");
 const handleSubmit= (e)=>{
   e.preventDefault();
   firebase.auth().createUserWithEmailAndPassword(userName, passWord).then((res)=>{
     res.user.updateProfile({displayName:userName}).then(()=>{
       firebase.firestore().collection('users').add({
         id:res.user.uid,
         userName:userName,
         phone:phone
       }).then(()=>history.push("/login"))
    
     })
   })
 };
 
  return (
    <div>
      <div className="signupParentDiv">
        {/* <img width="200px" height="200px" src={Logo}></img> */}
        <form  onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={userName}
            onChange={e=>setuserName(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={phone}
            onChange={
              e=>setphone(e.target.value)
            }
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={passWord}
            onChange={e=>setpassWord(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a href=" #" onClick={()=>history.push("/login")} >Login</a>
      </div>
    </div>
  );
}
