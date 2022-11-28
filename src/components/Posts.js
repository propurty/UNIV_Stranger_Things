import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostItem from "./PostItem";
import { deletePost } from "../api/api";

const Posts = ({ post, setPost, token }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(post);
  // Create a search bar to search for posts.

  useEffect(() => {
    if (searchTerm) {
      const searchTerms = searchTerm.toLowerCase().trim().split(" ");
      const filtered = post.filter((postObject) => {
        const filteredAttributes = [
          postObject.title,
          postObject.description,
          postObject.location,
          postObject.author.username,
        ];

        // loop through the values and check them against the search term one at a time
        // only match if the value and search term are non-empty strings (because matching against an empty string will always return true)
        for (let attribute of filteredAttributes) {
          const attributeLower = attribute.toLowerCase().trim();

          for (let term of searchTerms) {
            if (
              attributeLower.includes(term) &&
              attributeLower.length > 0 &&
              term.length > 0
            ) {
              return true;
            }
          }
        }
        return false;
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(post);
    }
  }, [searchTerm, post]);

  const handleDelete = async (postId) => {
    await deletePost(token, postId);
    setPost((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <>
      <h1 id='postHeader' className='ui center aligned header'>
        Browse through posts for something you might like!
      </h1>

      <div className='ui center aligned basic segment' id='searchOrCreate'>
        <div className='ui icon action input'>
          <input
            className='ui input'
            type='search'
            placeholder='Search...'
            autoComplete='off'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}></input>
          <div className='ui teal submit button'>Search</div>
        </div>
        <div className='ui horizontal divider' id='postOr'>
          Or
        </div>
        <Link to='/posts/create' className='ui blue labeled icon button'>
          Create Post
          <i className='add icon'></i>
        </Link>
      </div>
      <button
        className='ui circular icon button'
        data-tooltip='Back to top'
        data-inverted=''
        data-position='left center'
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
        id='scrollButton'>
        <i className='big arrow alternate circle up outline icon'></i>
      </button>
      <h4 className='large ui horizontal divider header' id='postDivider'>
        <i className='users icon'></i>Messages
      </h4>
      <div className='posts-container' id='posts-container'>
        {filteredPosts.map((item) => {
          return (
            <PostItem
              key={item._id}
              post={item}
              postHeader={
                item.isAuthor ? (
                  <div className='large green ui corner label'>
                    <i className='user outline icon'></i>
                  </div>
                ) : null
              }>
              {item.isAuthor ? (
                <a
                  className='large ui left red ribbon label'
                  onClick={() => handleDelete(item._id)}>
                  <i className='fitted trash alternate outline icon'></i> Remove
                  Post
                </a>
              ) : null}
            </PostItem>
          );
        })}
      </div>
    </>
  );
};

export default Posts;
