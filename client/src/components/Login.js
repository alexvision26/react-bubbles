import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [login, setLogin] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth().post('login', login).then(res => {
      // console.log(res)
      localStorage.setItem('token', res.data.payload)
      props.history.push('/bubbles')
    })
    .catch(err => console.log(err))
  }


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label>Username: <input type='text' name='username' onChange={handleChange}></input></label>
        <label>Password: <input type='password' name='password' onChange={handleChange}></input></label><br/>
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
