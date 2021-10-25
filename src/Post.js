import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  Repeat as RepeatIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  VerifiedUser as VerifiedUserIcon,
  Publish as PublishIcon,
} from "@material-ui/icons";
import "./Post.css";
import { AuthContext } from "./FireBaseContext";
import { useCollection, createRecord, createDoc, deleteDoc } from "./firebase";

const Post = forwardRef(
  ({ id, displayName, username, verified, text, image, avatar }, ref) => {
    const [isLike, setIsLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const { user } = useContext(AuthContext);
    const { data: postLikes } = useCollection("post_likes");
    const handleClickLike = async (e) => {
      const dataObj = {
        post_id: id,
        email: user.email,
      };
      setIsLike(true);
      await createRecord("post_likes", dataObj);
    };

    const handleClickUnlike = async (e) => {
      setIsLike(false);
      let like = postLikes.filter(
        (postLike) => postLike.post_id === id && user.email == postLike.email
      );
      await deleteDoc(`post_likes/${like[0].id}`);
    };

    useEffect(() => {
      if (postLikes) {
        let likes = postLikes.filter((post) => post.post_id == id);
        const isUserLiked = likes.filter(
          (like) => like.email == user.email
        ).length;
        setIsLike(isUserLiked ? true : false);
        setLikeCount(likes.length);
      }
    });

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
                <FavoriteIcon
                  onClick={handleClickUnlike}
                  fontSize="small"
                  style={{ cursor: "pointer", color: "red" }}
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={handleClickLike}
                  fontSize="small"
                  style={{ cursor: "pointer" }}
                />
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
