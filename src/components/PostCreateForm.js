import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/api";

const PostCreateForm = ({ token, setPost }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const { errorMessage, setErrorMessage } = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await createPost(
        token,
        title,
        description,
        price,
        location,
        willDeliver
      );
      console.log("PostCreateForm handleSubmit result:", result);
      console.log("PostCreateForm handleSubmit result.post:", result.post);

      if (result.post) {
        result.post.isAuthor = true;
        setPost((prevPosts) => [...prevPosts, result.post]);
        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setWillDeliver(false);
        navigate("/posts");
      } else {
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.error("!Error handleSubmit (PostCreateForm)!", error);
    }
  };

  return (
    <form className='ui card' onSubmit={handleSubmit}>
      <div className='content'>
        <h2 className='centered aligned header'>Create Post</h2>
        {/* //NOTE - fiddle with the form to make it look better. */}
        <div className='centered aligned description'>
          <div className='ui form'>
            <div className='field'>
              <label htmlFor='title'>Post Title * Required</label>
              <input
                id='title'
                type='text'
                name='title'
                placeholder='Write Title Here'
                required
                value={title}
                autoComplete='off'
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className='field'>
              <label htmlFor='description'>Item Description * Required</label>
              <input
                autoComplete='off'
                id='description'
                type='text'
                name='description'
                placeholder='Detailed Description'
                required
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className='field'>
              <label htmlFor='price'>Item Price * Required</label>
              <input
                autoComplete='off'
                id='price'
                type='text'
                name='price'
                placeholder='Starting Price'
                required
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <div className='field'>
              <label htmlFor='location'>Your Location</label>
              <input
                autoComplete='off'
                id='location'
                type='text'
                name='location'
                placeholder='(City, State) - Optional'
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>
            <div className='field'>
              <div className='ui checkbox'>
                <input
                  id='willDeliver'
                  type='checkbox'
                  name='willDeliver'
                  value={willDeliver}
                  onChange={(event) => setWillDeliver(event.target.value)}
                />
                <label htmlFor='willDeliver'>Offer Delivery?</label>
              </div>
            </div>
            {errorMessage ? (
              <p className='ui negative message'>{errorMessage}</p>
            ) : null}
            <button className='ui positive button' type='submit'>
              Create New Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostCreateForm;
