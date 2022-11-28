import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loginUser, registerUser } from "../api/api";

const AccountForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { action } = useParams();
  const navigate = useNavigate();
  console.log("action", action);

  // TODO - Tell the user (within the form) if the passwords don't match, if the username or password are bad, and if they enter the wrong login info.

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const authFn =
        action === "register" && password === confirmPassword
          ? registerUser
          : loginUser;
      const data = await authFn(username, password);
      setToken(data);
      if (data) {
        navigate("/");
      } else {
        //NOTE - Maybe add a message to the user that the passwords don't match.
        navigate("/account/register");
        console.log("data.message", data);
      }
    } catch (error) {
      console.error("!Error handleSubmit (AccountForm)!", error);
    }
  };

  const title = action === "login" ? "Log In" : "Sign Up";

  return (
    <form className='ui form' onSubmit={handleSubmit}>
      <h1>{title}</h1>
      <div className='field'>
        <label htmlFor='username'>Username</label>
        <input
          name='username'
          type='text'
          id='username'
          value={username}
          placeholder='Username'
          minLength={3}
          required
          autoComplete='off'
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className='field'>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          id='password'
          value={password}
          placeholder='Password'
          minLength={8}
          required
          autoComplete='off'
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {title === "Sign Up" && (
        <div className='field'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            name='confirmPassword'
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm Password'
            minLength={8}
            required
            autoComplete='off'
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
      )}
      <button className='ui button' type='submit'>
        {title}
      </button>
    </form>
  );
};

export default AccountForm;
