import React, {useState, useCallback} from 'react';
import {Redirect, useHistory} from "react-router-dom";
import "./Login.css"
import Axios from 'axios-observable';
import { writeStorage } from '@rehooks/local-storage';

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory();

    const login = useCallback(() => {
        return Axios.request({
            method: 'post',
            url: 'http://localhost:8080/user/login', 
            data: {
                username,
                password
        }})
        .subscribe(
            response => {
                console.log(response)
                writeStorage('jwt', response.data)
                setUsername('')
                setPassword('')
                history.push('/profile')
            }
                ,
            error => {
                console.log(error)
                if(error.response.status === 500) {
                    alert("Invalid username and/or password")
                }},
        )
    }, [password, username, history])


    return ( 
        <main className="main">
            <div className="login-div"> 
                <h1>Login</h1>
                <input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input><br></br>
                <button onClick={() => login()}>Login</button>
                <h3>Don't have an account? Please register <a href="/register">here</a>.</h3>
            </div>
        </main>
    )
}

export default Login