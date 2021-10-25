import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";
import { useContext } from "react";
import { AuthContext, FireBaseContext } from "./FireBaseContext";
import { useHistory } from "react-router";
import Arrow from "./Arrow";
import { useCollection } from "./firebase";

function Feed() {
  const { firebase } = useContext(FireBaseContext);
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { data, loading } = useCollection("posts");

  return (
    <div className="feed">
      <div className="feed__header">
        <span>
          <h2>Home</h2>
          <div className="loginPage">
            <span>
              {user ? (
                user.displayName
              ) : (
                <span onClick={() => history.push("/login")}>Login</span>
              )}
              <hr />
              <span
                onClick={() => {
                  document.getElementById("udrop").classList.toggle("show2");
                  console.log(`clicked`);
                }}
              >
                <Arrow></Arrow>{" "}
              </span>
              <div id="udrop" className="udrop">
                <ul>
                  {user && (
                    <div
                      className="logout"
                      onClick={() => {
                        firebase
                          .auth()
                          .signOut()
                          .then(() => {
                            history.push("/login");
                          })
                          .catch((error) => {
                            console.log(`Error Occured. Could'nt SignOut`);
                          });
                      }}
                    >
                      <li>Logout</li>
                      <hr></hr>
                    </div>
                  )}
                </ul>
              </div>
            </span>
          </div>{" "}
        </span>
      </div>

      <TweetBox />

      <FlipMove>
        {data &&
          data.map((post) => (
            <Post
              key={post.text}
              displayName={post.displayName}
              username={post.username}
              verified={post.verified}
              text={post.text}
              avatar={post.avatar}
              image={post.image}
              id={post.id}
            />
          ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
