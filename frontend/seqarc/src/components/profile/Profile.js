import React, {useEffect, useState, useCallback} from 'react';
import "./Profile.css"
import jwtDecode from 'jwt-decode'
import Axios from 'axios-observable';

/* This page will be accessed by logging in.
The user will be able to setup and change their profile here.
Their profile will be displayed as the "creator" of music they have created
and will represent them on the forums. */

function Profile(props) {

    // Destructure props
    const {token} = props

    const [profile, setProfile] = useState('')

    const decodeJWT = useCallback(() => {
        return jwtDecode(token)
    }, [token])

    useEffect(() => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        Axios.get('http://localhost:8080/user/profile/' + decodeJWT().id, config)
            .subscribe(
                (response) => {
                    setProfile(response.data)
                },
                error => console.log(error)
            );
    }, [token, decodeJWT])

    // Profilepicture
    const [file, setFile] = useState('');
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
                    'Authorization': 'Bearer ' + token
                }

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
                'Authorization': 'Bearer ' + token
            }
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

                <h1>Hello {profile.username}</h1>
                <img
                    className="profile-picture"
                    src={profile.profilePicture ? "/profilepictures/" + profile.profilePicture : "./profilepictures/doom-guy.jpg"}
                    alt="THEMOTHAFUCKINGDOOMGUY"/>

                <input type="file" onChange={onChange}/>
                <button onClick={() => uploadPicture()}>Upload</button>

                <h1>Description</h1>
                {editMode ?
                    <div>
                        <textarea value={description} className="description" rows="6" cols="60"
                                  onChange={(e) => setDescription(e.target.value)}/>
                        <button onClick={() => {
                            saveDescription()
                            setEditMode(false)
                        }}>Save
                        </button>
                        <button onClick={() =>
                            setEditMode(false)
                        }>Cancel
                        </button>
                    </div>
                    :
                    <div>
                        <div>
                            {profile.profileDescription}
                        </div>
                        <button onClick={() => {
                            setEditMode(true)
                            setDescription(profile.profileDescription)
                        }}>Edit
                        </button>
                    </div>
                }
            </div>
        </main>
    )
}

export default Profile