import React from 'react';
import { useState , useContext} from 'react';
import { FireBaseContext } from '../../FireBaseContext';
import './Login.css';
import { useHistory } from 'react-router';
function Login() {
  const [userName, setuserName] = useState("");
  const [passWord, setpassWord] = useState("");
  const {firebase} = useContext(FireBaseContext);
  const history = useHistory();
  const handleSubmit= (e)=>{
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(userName, passWord).then(()=>{
      history.push("/")
    }).catch((err)=>{
      alert(err.message)
    })
    
    }
  return (
    <div>
      <div className="loginParentDiv">
        {/* <img width="200px" height="200px" src={Logo}></img> */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value ={userName}
            onChange={(e)=>setuserName(e.target.value)}
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
          <button>Login</button>
        </form>
        <a onClick={()=>{history.push("/signup")}} href=" #">Signup</a>
      </div>
    </div>
  );
}

export default Login;
