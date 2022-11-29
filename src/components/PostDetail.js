import React, { useState } from "react";
import PostItem from "./PostItem";
import { useParams } from "react-router-dom";
import { createMessage } from "../api/api";

const PostDetail = ({ token, post, getPosts }) => {
  const [postMessage, setPostMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { postId } = useParams();

  const singlePost = post.find((singlePostItem) => {
    const foundPost = singlePostItem._id === postId;
    return foundPost;
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await createMessage(token, postId, postMessage);

    console.log("createMessage: ", result);

    if (result.message) {
      // If the message was created successfully, then we update the post.
      setPostMessage("");
      setSuccessMessage(true);
      // Get all posts to update the post with the new message.
      await getPosts();
    } else {
      setErrorMessage(result.error);
    }
  };

  if (!singlePost) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className='ui container'>
        <PostItem post={singlePost} />
        {!singlePost.isAuthor && token ? (
          <form className='ui form' onSubmit={handleSubmit}>
            <div className='inline fields'>
              <input
                type='text'
                name='postMessage'
                value={postMessage}
                placeholder='Add a comment...'
                className='ui input'
                autoComplete='off'
                onChange={(event) => setPostMessage(event.target.value)}
              />
              <button className='positive ui submit button' type='submit'>
                Submit
              </button>
              {successMessage && (
                <div className='ui pointing green label'>
                  <i className='check icon'></i>
                  Message sent!
                </div>
              )}
              {errorMessage && (
                <p style={{ color: "red", backgroundColor: "pink" }}>
                  Error: {errorMessage}
                </p>
              )}
            </div>
          </form>
        ) : null}
      </div>
    </>
  );
};

export default PostDetail;
