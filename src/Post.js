import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  Repeat as RepeatIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  VerifiedUser as VerifiedUserIcon,
  Publish as PublishIcon
} from "@material-ui/icons";
import "./Post.css";
import { AuthContext } from './FireBaseContext'
import db from "./firebase";

const Post = forwardRef(
  ({ id, displayName, username, verified, text, image, avatar }, ref) => {
    const [isLike, setIsLike] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const { user } = useContext(AuthContext)
    const postLikesCollection = db.collection('post_likes')

    const handleClickLike = (e) => {
      const dataObj = {
        post_id: id,
        email: user.email,
        created_at: new Date()
      }

      setIsLike(true)
      
      postLikesCollection.add(dataObj) 
    }

    const handleClickUnlike = (e) => {
      setIsLike(false)

      postLikesCollection
        .where('post_id', '==', id)
        .where('email', '==', user.email)
        .get()
        .then((docs) => docs.forEach((doc) => doc.ref.delete()))
    }

    useEffect(() => {
      postLikesCollection
        .where('post_id', '==', id)
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data())
          const isUserLiked = data.some((row) => row.post_id === id && row.email === user.email)

          setIsLike(isUserLiked)
          setLikeCount(data.length)
        })
    })

    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />} @
                  {username}
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          <img src={image} alt="" />
          <div className="post__footer">
            <ChatBubbleOutlineIcon fontSize="small" />
            <RepeatIcon fontSize="small" />
            <div>
              {isLike ? (
                <FavoriteIcon onClick={handleClickUnlike} fontSize="small" style={{ cursor: 'pointer', color: 'red' }} />
              ) : (
                <FavoriteBorderIcon onClick={handleClickLike} fontSize="small" style={{ cursor: 'pointer' }} />
              )}
              <small className="post__likeCount">{likeCount}</small>
            </div>
            <PublishIcon fontSize="small" />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
