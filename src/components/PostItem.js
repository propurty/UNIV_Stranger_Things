import React from "react";
import { Link } from "react-router-dom";
// import {deletePost} from '../api/api';

// REVIEW - Does deletePost need to set active to false.
// TODO - { , setPost, token } as props.
const PostItem = ({ post }) => {
  // REVIEW - delete handler and postID as prop.
  // const handleDelete = async (postID) => {
  //   // NOTE - Check order of parameters to match correctly.
  //   await deletePost(token, postID);
  //   setPost((prevPosts) => prevPosts.filter((post) => post._id !== postID));
  // };

  //TODO - Add delete button ICON trashcan. Map message array.

  //NOTE - large do anything? I added it.
  return (
    <div className='ui large card'>
      <div className='content'>
        {post.isAuthor ? (
          <div className='right floated aligned tiny header'>You</div>
        ) : null}
        <div className='centered aligned header'>{post.title}</div>
        {/* <div className='right aligned tiny header'>{post.createdAt}</div> Date is too specific. */}
        <div className='centered aligned description'>
          <p>{post.description}</p>
          <br></br>
          <div className='extra content'>
            <div className='left floated aligned header'>
              {"Sold by: " + post.author.username}
            </div>
            <br></br>
            <div className='left floated aligned header'>
              {"Location: " + post.location}
            </div>
            <div className='right floated aligned header'>{post.price}</div>
            <br></br>
            <div className='left floated aligned header'>
              {post.willDeliver ? "Ships: Yes" : "Ships: No"}
            </div>

            <div className='right floated aligned header'>
              <Link to=''>View Info</Link>
            </div>
          </div>
        </div>
        <div
          role='list'
          className='ui divided relaxed list'
          style={{ color: "#444" }}>
          {/* {post.isAuthor ? (
            <button
              className='negative ui button left floated'
              onClick={() => handleDelete(post._id)}>
              Remove Post
            </button>
          ) : null} */}
          {post.messages.map((message) => {
            return (
              <div role='listitem' className='item' key={message.fromUser._id}>
                <b>{message.fromUser.username}</b>
                <p className='content'>{message.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
