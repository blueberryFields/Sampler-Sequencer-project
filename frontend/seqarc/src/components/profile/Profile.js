import React, {useEffect, useState} from 'react';
import "./Profile.css"
import "../images/Doom_Guy.jpg"
import jwtDecode from 'jwt-decode'
import { useLocalStorage} from '@rehooks/local-storage';
import Axios from 'axios-observable';


function Profile(props) {

    // Destructure props
    const {token} = props

    // const [token] = useLocalStorage('jwt');
    const [profile, setProfile] = useState('')

    const decodeJWT = () => {
        return jwtDecode(token)
    }

    // console.log(decodeJWT())

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
        const [description, setDescription] = useState('');

        const onChange = e => {
            setFile(e.target.files[0]);
        }

        const uploadPicture = () => {
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

        const saveDescription = () => {
            
            Axios.request({
                method: 'put',
                url: 'http://localhost:8080/user/' + decodeJWT().id,
                data: {
                    "profileDescription": description
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token}
                })
                .subscribe(
                    response => {
                        setProfile(response.data)
                    },
                    error => {
                        console.log(error)
                    }
                );
        }

        const [editMode, setEditMode] = useState(false)



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
                {/*<input type="submit" value="Upload" onSubmit={uploadPicture()}/>*/}
                <button onClick={() => uploadPicture()}>Upload</button>

                <h1>Description</h1>


               {editMode ? 
                <div>
                        <textarea value={description} className="description" rows="6" cols="60" onChange={(e) => setDescription(e.target.value)}></textarea>
                        <button onClick={() => {
                            saveDescription()
                            setEditMode(false)
                        }}>Save</button>
                        <button onClick={() =>
                            setEditMode(false)
                        }>Cancel</button>
                    </div>
                :
                    <div>
                        <div>
                            {profile.profileDescription}
                        </div>
                        <button onClick={() => {
                            setEditMode(true)
                            setDescription(profile.profileDescription)
                            }}>Edit</button>
                    </div>
               }

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