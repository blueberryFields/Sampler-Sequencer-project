import React, { useState, useCallback } from "react";
import "./Login.css";
import Axios from "axios-observable";
import { writeStorage } from "@rehooks/local-storage";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = useCallback(() => {
    return Axios.request({
      method: "post",
      url: "http://localhost:8080/user/login",
      data: {
        username,
        password,
      },
    }).subscribe(
      (response) => {
        writeStorage("jwt", response.data);
        props.setShowLogin(false)
      },
      (error) => {
        console.log(error);
        if (error.response.status === 500) {
          alert("Invalid username and/or password");
        }
      }
    );
  }, [password, username]);

  return (
    <div className="login-container">
      <div className="login-content">
        <input
          className="login-input"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="login-button" onClick={() => login()}>
          Login
        </div>
        <div>
          Don't have an account? Please register <a href="/register">here</a>.
        </div>
      </div>
    </div>
  );
}

export default Login;
