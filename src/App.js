import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { fetchPosts, fetchUser } from "./api/api";
import "./App.css";
import {
  AccountForm,
  Home,
  PostCreateForm,
  PostDetail,
  Posts,
} from "./components";

// NOTE - An input can be type="search", see what it does.
// REVIEW - check ui button classes for login and signup.
// TODO - Replace Semantic UI className(s) and try Tailwind.css instead.

//----------------- App -----------------
const App = () => {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const navigate = useNavigate();

  //----------------- useEffect -----------------

  //TODO - Remove useEffect and have just getPosts for the eventual postDetail component.
  // useEffect(() => {
  //   const getPosts = async () => {
  //     try {
  //       const result = await fetchPosts(token);
  //       setPost(result);
  //     } catch (error) {
  //       console.error("!Error in useEffect (getPosts)!", error);
  //     }
  //   };
  //   getPosts();
  // }, [token]);

  //REVIEW - Check if getPosts and the following useEffect changes are needed.
  const getPosts = async () => {
    try {
      const result = await fetchPosts(token);
      setPost(result);
    } catch (error) {
      console.error("!Error in getPosts!", error);
    }
  };
  useEffect(() => {
    getPosts();
  }, [token]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        const user = await fetchUser(token);
        setUser(user);
      };
      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  const logOut = () => {
    setUser(null);
    setToken(null);
    navigate("/");
  };

  //----------------- return -----------------
  return (
    <div className='container'>
      <nav className='ui secondary menu'>
        {/* blue ui button */}
        <Link className='active-item' to='/'>
          Home
        </Link>
        <Link className='blue ui button' to='/posts'>
          Posts
        </Link>
        <div className='right menu'>
          {token ? (
            <button onClick={logOut} className='red inverted ui button'>
              Log Out
            </button>
          ) : (
            <div className='ui buttons'>
              <Link className='green ui button' to='/account/login'>
                Log In
              </Link>
              <div>or</div>
              <Link className='green ui button' to='/account/register'>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route
          className='item'
          path='/posts/create'
          element={<PostCreateForm token={token} setPost={setPost} />}
        />
        <Route
          className='item'
          path='/posts/:postId'
          element={<PostDetail token={token} post={post} getPosts={getPosts} />}
        />
        <Route
          className='item'
          path='/posts'
          element={<Posts post={post} token={token} setPost={setPost} />}
        />
        <Route
          className='item'
          path='/account/:action'
          element={<AccountForm setToken={setToken} />}
        />
      </Routes>
    </div>
  );
};

//----------------- Export -----------------
export default App;
