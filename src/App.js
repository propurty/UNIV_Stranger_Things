import React, { useState, useEffect } from "react";
// import { Link, Switch, Route } from "react-router-dom";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";
import { fetchPosts } from "./api/api";
import { Posts, Home } from "./components";
// import ReactDOM from "react-dom";

//----------------- App -----------------
const App = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const result = await fetchPosts();
        setPost(result);
      } catch (error) {
        console.error("!Error useEffect (getPosts)!", error);
      }
    };
    getPosts();
  }, []);

  return (
    <div className='container'>
      <nav className='ui secondary menu'>
        <Link className='item' to='/'>
          Home
        </Link>
        <Link className='item' to='/posts'>
          Posts
        </Link>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route className='item' path='/posts' element={<Posts post={post} />} />
      </Routes>
    </div>
  );
};

//----------------- Export & Render -----------------
export default App;
// ReactDOM.render(<App />, document.getElementById("App"));
