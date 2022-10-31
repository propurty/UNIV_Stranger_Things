import React from "react";
import PostItem from "./PostItem";
import { Link } from "react-router-dom";
import "./Posts.css";
// FIXME - !!!!!!!!
// TODO - { , setPost, token } as props.
const Posts = ({ post }) => {
  return (
    <>
      <Link to='/posts/create' className='ui-button'>
        Create Post
      </Link>
      <div className='posts-container'>
        {post.map((item) => {
          return (
            <PostItem
              key={item._id}
              post={item}
              // setPost={setPost}
              // token={token}
            />
          );
        })}
      </div>
    </>
  );
};

export default Posts;
