import React, {useState, useCallback} from 'react';
import "./Login.css"
import Axios from 'axios-observable';
import { writeStorage } from '@rehooks/local-storage';

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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
                setPassword('')},
            error => {
                console.log(error)
                alert("Invalid username and/or password")},
        )
    }, [password, username])

    

    return ( 
        <main>
            <div>
                <h1>JWT Token login</h1>
                <input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                <button onClick={() => login()}>Login</button>
            </div>
        </main>
    )
}

export default Login