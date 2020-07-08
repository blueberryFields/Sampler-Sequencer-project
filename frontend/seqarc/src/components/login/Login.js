import React, { useState, useCallback } from "react";
import "./Login.css";
import Axios from "axios-observable";
import { writeStorage } from "@rehooks/local-storage";

function Login({ setShowLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginMode, setLoginMode] = useState(true);

  const login = useCallback(() => {
    if (username && password)
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
          setShowLogin(false);
        },
        (error) => {
          console.log(error);
          if (error.response.status === 500) {
            alert("Invalid username and/or password");
          }
        }
      );
  }, [password, username, setShowLogin]);

  const register = useCallback(() => {
    if (username && password)
      return Axios.request({
        method: "post",
        url: "http://localhost:8080/user/create",
        data: {
          username,
          password,
          profileDescription: "",
          roles: ["ROLE_USER"],
        },
      }).subscribe(
        (response) => {
          setUsername("");
          setPassword("");
          setLoginMode(true);
        },
        (error) => {
          console.log(error.response);
          if (error.response.status === 409) {
            alert("Username is already taken.\nPlease select a new one.");
          }
        }
      );
  }, [username, password]);

  return (
    <div className="login-container">
      <div
        className="login-content"
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            login();
          }
        }}
      >
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
        {loginMode ? (
          <>
            <div tabIndex="0" className="login-button" onClick={login}>
              Login
            </div>
            <div>
              Don't have an account? Please register{" "}
              <span onClick={() => setLoginMode(false)} className="link">
                here
              </span>
              .
            </div>
          </>
        ) : (
          <>
            <div tabIndex="0" className="login-button" onClick={register}>
              Signup
            </div>
            <div>
              Already have an account? Please sign in{" "}
              <span onClick={() => setLoginMode(true)} className="link">
                here
              </span>
              .
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
