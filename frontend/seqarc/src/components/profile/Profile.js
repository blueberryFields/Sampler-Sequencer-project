import React from 'react';
import "./Profile.css"
import "../images/Doom_Guy.jpg"
import UploadImage from './UploadImage.js';
import UserForm from './UserForm.js';
import jwtDecode from 'jwt-decode'
import { useLocalStorage} from '@rehooks/local-storage';

function Profile() {

    const [token, setToken] = useLocalStorage('jwt');

    const decodeJWT = () => {
        return jwtDecode(token)
    }

    console.log(decodeJWT())

    return (
        <main>
            <div className="profile-body">

                
                {/* This page will be accessed by logging in.
                The user will be able to setup and change their profile here.
                Their profile will be displayed as the "creator" of music they have created
                and will represent them on the forums. */}

                <h1>Welcome DJ {decodeJWT().sub}</h1>
                


            
                <UploadImage></UploadImage>

                <UserForm></UserForm>

                
                
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