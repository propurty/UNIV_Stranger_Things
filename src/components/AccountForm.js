import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loginUser, registerUser } from "../api/api";

const AccountForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { userStatus } = useParams();

  // TODO - Tell the user (within the form) if the passwords don't match, if the username or
  // password are bad, and if they enter the wrong login info.
  // NOTE - Message exists inside data.message.
  // TODO - Maybe change to the cleaner api which destructures the object.

  const handleSubmit = async (event) => {
    event.preventDefault();

    const authFn =
      userStatus === "register" && password === confirmPassword
        ? registerUser
        : loginUser;
    const { data } = await authFn(username, password);
    setToken(data.token);
    if (data.token) {
      navigate("/");
    } else {
      //NOTE - Maybe add a message to the user that the passwords don't match.
      //REVIEW - Is navigate("/account/register") the correct thing to do?
      navigate("/account/register");
      console.log("Passwords do not match");
    }
  };

  const title = userStatus === "login" ? "Log In" : "Sign Up";

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
