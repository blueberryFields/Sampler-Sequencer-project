import React, {useState, useCallback} from 'react'
import './Register.css'
import Axios from 'axios-observable'
import {useHistory} from "react-router-dom";


function Register() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [profileDescription, setProfileDescription] = useState('')
    const [roles, setRoles] = useState(['ROLE_USER'])
    let history = useHistory();


    const register = useCallback(() => {

        return Axios.request({
            method: 'post',
            url: 'http://localhost:8080/user/create',
            data: {
                username,
                password,
                profileDescription,
                roles
            }})
            .subscribe(
                response => {
                    console.log(response)
                    setUsername('')
                    setPassword('')
                    setProfileDescription('')
                    history.push('/login')
                    },
                error => {
                    console.log(error.response)
                    if(error.response.status === 409) {
                        alert("Username is already taken.\nPlease select a new one.")
                    }
                },
                    )
                }, [username, password, profileDescription, roles])

                return (
                    <main>
                        <div>
                            <h1>Register</h1>
                            <input type="text" value={username} placeholder="Desired username" onChange={(e) => setUsername(e.target.value)}></input>
                            <input type="text" value={password} placeholder="Desired password" onChange={(e) => setPassword(e.target.value)}></input> <br></br>
                            <button onClick={() => register()}>Register</button>
                        </div>
                    </main>
                )
            }

export default Register