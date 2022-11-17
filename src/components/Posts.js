import React from "react";
import { Link } from "react-router-dom";
import PostItem from "./PostItem";
import { deletePost } from "../api/api";
import "./Posts.css";

// REVIEW - Check if this step is needed. Watch video.
// TODO - Add a headerElement to the PostItem component, instead of having it inside PostItem.
// TODO - Add the delete button from PostItem under the PostItem component instead.

// replaced - , setPost, token

const Posts = ({ post, setPost, token }) => {
  const handleDelete = async (postId) => {
    await deletePost(token, postId);
    setPost((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <>
      <Link to='/posts/create' className='green ui button'>
        Create Post
      </Link>
      <div className='posts-container'>
        {post.map((item) => {
          return (
            <PostItem
              key={item._id}
              post={item}
              postHeader={
                item.isAuthor ? (
                  <i className='fitted right floated aligned big black user circle icon'></i>
                ) : null
              }>
              {item.isAuthor ? (
                <>
                  <br></br>
                  <a
                    className='ui red ribbon label'
                    onClick={() => handleDelete(item._id)}>
                    Remove Post
                  </a>
                </>
              ) : null}
            </PostItem>
          );
        })}
      </div>
    </>
  );
};

export default Posts;
