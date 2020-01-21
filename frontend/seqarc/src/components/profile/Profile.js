import React, {useEffect, useState} from 'react';
import "./Profile.css"
import "../images/Doom_Guy.jpg"
import jwtDecode from 'jwt-decode'
import { useLocalStorage} from '@rehooks/local-storage';
import Axios from 'axios-observable';


function Profile() {

    const [token] = useLocalStorage('jwt');
    const [profile, setProfile] = useState('')

    const decodeJWT = () => {
        return jwtDecode(token)
    }

<<<<<<< HEAD
    // console.log(decodeJWT())
=======

>>>>>>> f779752c13f1eac048e594d4906bfd7f8dfdf822

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
<<<<<<< HEAD
=======
                    // console.log(profile)
>>>>>>> f779752c13f1eac048e594d4906bfd7f8dfdf822
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

        const uploadPicture = () => {
            console.log("Hej")
            if (file) {
                const bodyFormData = new FormData();
                bodyFormData.append('file', file);

                Axios.request({
                    method: 'post',
                    url: 'http://localhost:8080/user/upload/' + decodeJWT().id,
                    data: bodyFormData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token}

                })
                    .subscribe(
                        response => {
                            setFile(null)
                            setProfile(response.data)
                        },
                        error => {
                            console.log(error)
                        }
                    );
            }
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

                <input type="file" onChange={onChange}/>
                <input type="submit" value="Upload" onSubmit={uploadPicture()}/>


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