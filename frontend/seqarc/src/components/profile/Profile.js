import React, {useEffect, useState} from 'react';
import "./Profile.css"
import "../images/Doom_Guy.jpg"
import UploadImage from './UploadImage.js';
import jwtDecode from 'jwt-decode'
import {useLocalStorage} from '@rehooks/local-storage';
import Axios from 'axios-observable';


function Profile() {

    const [token] = useLocalStorage('jwt');
    const [profile, setProfile] = useState('')

    const decodeJWT = () => {
        return jwtDecode(token)
    }



    useEffect(() => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        //const subscription =
        Axios.get('http://localhost:8080/user/profile/' + decodeJWT().id, config)
            .subscribe(
                (response) => {
                    setProfile(response.data)
                    // console.log(profile)
                },
                error => console.log(error)
            );

        // return function cleanup() {
        //     subscription.unsubscribe();
        // }
    }, [])

    return (
        <main>
            <div className="profile-body">


                {/* This page will be accessed by logging in.
                The user will be able to setup and change their profile here.
                Their profile will be displayed as the "creator" of music they have created
                and will represent them on the forums. */}

                <h1>Welcome {profile.username}</h1>


                {/* <UploadImage></UploadImage> */}


                {/* <Grid className="profile-grid">
                    <Cell col={6}>
                        <img src="../images/Doom_Guy.jpg"></img>
                    </Cell>
                    <Cell col={6}>half page</Cell>
                </Grid> */}
            </div>
        </main>
    )
}

export default Profile