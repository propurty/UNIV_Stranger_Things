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
  Profile,
} from "./components";

//----------------- App -----------------
const App = () => {
  const [post, setPost] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getPosts = async () => {
    try {
      console.log("Requested token for getPosts in app.js", token);
      const result = await fetchPosts(token);

      setPost(result);
    } catch (error) {
      console.error("!Error in getPosts!", error);
    }
  };

  //----------------- useEffects -----------------
  useEffect(() => {
    getPosts();
  }, [token]);

  // If I set fetchUser to token.token, login works fine.
  // Otherwise, I get an error but login still works sometimes?
  // But using token.token makes my registration fail. Not sure
  // where the bug is but I'm going to leave it as is for now.
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        const data = await fetchUser(token);
        console.log("fetch user", data);
        setUser(data);
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
      {location.pathname === "/posts" ? (
        <div className='headerMast'></div>
      ) : null}
      <nav
        className='fluid inverted ui borderless fixed secondary menu'
        id='nav-bar'>
        <div className='left menu'>
          <Link className='blue ui button' to='/'>
            Home
          </Link>
          <Link className='blue ui button' to='/posts'>
            Posts
          </Link>
        </div>
        <h2 className='ui right header item' id='navBarTitle'>
          Stranger Things
        </h2>
        <div className='right menu' id='navRightButtons'>
          {token ? (
            <>
              <Link
                className='blue ui right floated button'
                to='/profile'
                style={{ fontFamily: "Righteous", fontWeight: "400" }}>
                Profile
              </Link>
              <button
                onClick={logOut}
                className='red inverted ui right floated button'>
                Log Out
              </button>
            </>
          ) : (
            <div className='ui buttons'>
              <Link className='green ui button' to='/account/login'>
                Log In
              </Link>
              {/* TODO - center the or and make it the same font */}
              <div
                className='or'
                style={{
                  fontFamily: "Kalam",
                  fontWeight: "400",
                }}></div>
              <Link className='green ui button' to='/account/register'>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Home token={token} user={user} />} />
        <Route
          className='item'
          path='/posts/create'
          element={<PostCreateForm token={token} setPost={setPost} />}
        />
        <Route
          className='item'
          path='/posts/:postId'
          element={
            <PostDetail
              token={token}
              post={post}
              getPosts={getPosts}
              isAuthor={post.isAuthor}
            />
          }
        />
        <Route
          className='item'
          path='/profile'
          element={<Profile user={user} />}
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
