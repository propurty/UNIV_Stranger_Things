import React from "react";
import { Link } from "react-router-dom";

const PostItem = ({ post, postHeader, children }) => {
  //TODO - Add delete button ICON trashcan. Map message array.
  //TODO - Add time to post and format it to how recent it was posted. Like, "Posted 1 day ago."
  //REVIEW - Check if the post written by you shows an indication of it.
  //REVIEW - Check for any additional info to add or any uselsess code to remove.

  return (
    <div className='ui card'>
      <div className='content'>
        {postHeader}
        <div className='left aligned header'>{post.title}</div>
        {/* <div className='right aligned tiny header'>{post.createdAt}</div>
        Date is too specific. */}
        <div className='centered aligned description'>
          <p>{post.description}</p>
          <br></br>
          <div className='extra content'>
            <div className=''>
              {post.location ? "Location: " + post.location : null}
            </div>
            <div className='left floated aligned header'>
              {"Sold by: " + post.author.username}
            </div>
            <div className='right floated aligned header'>{post.price}</div>
            <br></br>
            <div className='left floated aligned header'>
              {post.willDeliver ? "Ships: Yes" : "Ships: No"}
            </div>
            {children}
            <div className='right floated aligned header'>
              <Link
                to={`/posts/${post._id}`}
                className='ui blue right ribbon label'>
                Details
              </Link>
            </div>
          </div>
        </div>

        <div
          role='list'
          className='ui divided relaxed list'
          style={{ color: "#444", clear: "both" }}>
          {/* REVIEW - post.message instead of messages? Test messages appearing. */}
          {/* REVIEW - Check fromUser.username and other references. */}
          {post.messages.map((message) => {
            return (
              <div
                role='listitem'
                // Had tiny ui message as className.
                className='item'
                key={message._id}>
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
