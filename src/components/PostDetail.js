import React, { useState } from "react";
import PostItem from "./PostItem";
import { useParams } from "react-router-dom";
import { createMessage } from "../api/api";

const PostDetail = ({ token, post, getPosts }) => {
  const [postMessage, setPostMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { postId } = useParams();

  //REVIEW - Should it be == or ===?
  const singlePost = post.find((singlePostItem) => {
    const foundPost = singlePostItem._id == postId;
    return foundPost;
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await createMessage(token, postId, postMessage);
    console.log("createMessage: " + result);
    if (result.message) {
      // If the message was created successfully, then we update the post.
      setPostMessage("");
      console.log("We added a comment");
      // Get all posts to update the post with the new message.
      await getPosts();
    } else {
      setErrorMessage(result.error);
      console.log("Comment not created");
    }
  };

  if (!singlePost) {
    return <h2>Loading...</h2>;
  }

  //TODO - Add classname for button and style it.
  return (
    <>
      <PostItem post={singlePost} />
      <form className='ui card' onSubmit={handleSubmit}>
        <div className='field'>
          <input
            type='text'
            name='postMessage'
            value={postMessage}
            placeholder='Add a comment...'
            className=''
            onChange={(event) => setPostMessage(event.target.value)}
          />
          <button className='positive ui button right floated' type='submit'>
            Submit
          </button>
          {errorMessage && (
            <p style={{ color: "red", backgroundColor: "pink" }}>
              Error: {errorMessage}
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default PostDetail;
