import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loginUser, registerUser } from "../api/api";

const AccountForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { action } = useParams();
  const navigate = useNavigate();
  console.log("action", action);

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
        // navigate("/account/register");
        setErrorMessage(true);
      }
    } catch (error) {
      console.error("!Error handleSubmit (AccountForm)!", error);
    }
  };

  const title = action === "login" ? "Log In" : "Sign Up";

  return (
    <div className='ui text container'>
      <form className='ui form' onSubmit={handleSubmit}>
        <h1 className='ui horizontal divider header'>{title}</h1>

        <div className='field' id='loginRegister'>
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
          {errorMessage && (
            <div className='ui pointing red label'>
              <i className='warning icon'></i>
              Please make sure your passwords match!
            </div>
          )}
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
            {errorMessage && (
              <div className='ui pointing red label'>
                <i className='warning icon'></i>
                Please make sure your passwords match!
              </div>
            )}
          </div>
        )}
        <button className='ui positive button' type='submit'>
          {title}
        </button>
      </form>
      {title === "Log In" ? (
        <div className='ui warning message'>
          <i className='icon help'></i>
          Need to make an account?{" "}
          <a href='/account/register'>Register here </a>
          instead.
        </div>
      ) : (
        <div className='ui warning message'>
          <i className='icon help'></i>
          Already signed up? <a href='/account/login'>Login here</a> instead.
        </div>
      )}
    </div>
  );
};

export default AccountForm;
