import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { fetchPosts, fetchUser } from "./api/api";
import { Posts, Home, AccountForm, PostCreateForm } from "./components";
import "./App.css";

{
  /* TODO - Replace Semantic UI className(s) and try Tailwind.css instead. */
}

//----------------- App -----------------
const App = () => {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const navigate = useNavigate();

  //----------------- useEffect -----------------
  useEffect(() => {
    const getPosts = async () => {
      try {
        const result = await fetchPosts(token);
        setPost(result);
      } catch (error) {
        console.error("!Error in useEffect (getPosts)!", error);
      }
    };
    getPosts();
  }, [token]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        const { user } = await fetchUser(token);
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

  return (
    <div className='container'>
      <nav className='ui secondary menu'>
        <Link className='item' to='/'>
          Home
        </Link>
        <Link className='item' to='/posts'>
          Posts
        </Link>

        <div className='right menu'>
          {token ? (
            <button onClick={logOut} className='item'>
              Log Out
            </button>
          ) : (
            <>
              <Link className='item' to='/account/login'>
                Log In
              </Link>
              <Link className='item' to='/account/register'>
                Sign Up
              </Link>
            </>
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
