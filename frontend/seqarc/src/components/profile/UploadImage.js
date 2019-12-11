import React, {Fragment, useState} from "react";
import { Grid, Cell} from 'react-mdl';
// import Fragment from 'react-bootstrap/Fragment';

// https://www.youtube.com/watch?v=b6Oe2puTdMQ

const UploadImage = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');

    // Method that targets the first file in an array (since we only need one file)
    const onChange = e => {
        setFile(e.target.files[0]);
    }

    // const []

    return (
        <Fragment>
            <form>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="customFile" onChange=
                    {onChange}/>
                    <label className="custom-file-label" for="customFile">
                        {filename}
                    </label>
                </div>
                <input type="submit" value="Upload" className="btn btn-primary btn-block"></input>
            </form>
        </Fragment>
    )

















    // const defaultImage = require('../images/Doom_Guy.jpg');
    // const uploadImage = 

    // const image = { defaultImage, }

    // const [image, setImage] = useState(defaultImage);

    // const handleChange = (e) => {
    //     setImage({
    //         preview: URL.createObjectURL(e.target.files[0]),
    //         raw: e.target.files[0]
    //     })
    // }

    // return (
    //     <div>
    //         <img src={defaultImage}></img>
    //         {/* <button onClick={() => setImage}></button> */}
    //     </div>
    // )
}

export default UploadImage