import React, {useState, useCallback} from 'react';
import "./Login.css"
import Axios from 'axios-observable';

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = useCallback(() => {
        return Axios.request({
            method: 'post',
            url: 'localhost:8080/user/login', 
            data: {
                username,
                password
        }})
        .subscribe(
            response => console.log(response),
            error => console.log(error)
        
        )
    }, [password, username])

    

    return ( 
        <main>
            <div>
                <h1>JWT Token login</h1>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                <button onClick={() => login()}>Login</button>
            </div>
        </main>
    )
}

export default Login