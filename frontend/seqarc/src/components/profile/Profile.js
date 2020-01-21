import React, {useEffect, useState} from 'react';
import "./Profile.css"
import "../images/Doom_Guy.jpg"
import jwtDecode from 'jwt-decode'
import { useLocalStorage} from '@rehooks/local-storage';
import Axios from 'axios-observable';


function Profile() {

    const [token, setToken] = useLocalStorage('jwt');
    const [profile, setProfile] = useState('')

    const decodeJWT = () => {
        return jwtDecode(token)
    }

    console.log(decodeJWT())

    useEffect(() => {
            let config = {
              headers: {
                'Authorization': 'Bearer ' + token
              }
            }
            // let subscription = 
        Axios.get('http://localhost:8080/user/profile/' + decodeJWT().id, config)
            .subscribe(
                (response) => {
                    setProfile(response.data)
                    console.log(profile)
                },
                error => console.log(error)
            );
            // return function cleanup() {
            //     subscription.unsubscribe();
            // }
        }, [])

        // Profilepicture
        const [file, setFile] = useState('');
        const [filename, setFilename] = useState('');

        const onChange = e => {
            setFile(e.target.files[0]);
        }

    return (
        <main className="profile-container">
            <div className="profile-body">

                
                {/* This page will be accessed by logging in.
                The user will be able to setup and change their profile here.
                Their profile will be displayed as the "creator" of music they have created
                and will represent them on the forums. */}

                <h1>Hello {profile.username}</h1>
                <img 
                className="profile-picture"
                src={profile.profilePicture ? "/profilepictures/" + profile.profilePicture : "./profilepictures/doom-guy.jpg"} 
                alt="THEMOTHAFUCKINGDOOMGUY"/>
                <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>

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