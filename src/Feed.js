import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import db from "./firebase";
import FlipMove from "react-flip-move";
import { useContext} from 'react';
import { AuthContext , FireBaseContext} from './FireBaseContext';
import { useHistory } from 'react-router';
import Arrow from './Arrow';

function Feed() {
  const [posts, setPosts] = useState([]);
  const {firebase} = useContext(FireBaseContext);
  const history = useHistory();
  const {user} = useContext(AuthContext);
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => 
      setPosts(snapshot.docs.map((doc) => {
        const data = doc.data()

        return {
          ...data,
          id: doc.id,
        }
      }))
    );
  }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <span><h2>Home</h2> 
      <div className="loginPage">
          <span>{user? user.displayName:<span onClick={()=>history.push("/login")}>Login
          </span> }<hr />
          <span  onClick={()=>{
            document.getElementById("udrop").classList.toggle("show2");
            console.log(`clicked`)
          }}><Arrow></Arrow> </span>
          <div id="udrop" className= "udrop">
          <ul>
          {user && <div className="logout" onClick={()=>{
          firebase.auth().signOut().then(() => {
            history.push("/login")
          }).catch((error) => {
            console.log(`Error Occured. Could'nt SignOut`)
          });
        }}><li>Logout</li><hr></hr></div>}
        </ul>
          </div></span>
        
          
         
        </div> </span>
      </div>

      <TweetBox />

      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            displayName={post.displayName}
            username={post.username}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
