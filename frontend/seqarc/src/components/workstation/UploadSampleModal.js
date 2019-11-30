import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './Workstation.css'

const Modal = ({isShowing, hide}) => {

    const [selectedFile, setSelectedFile] = useState(null)

    const onChangeHandler = (event) => {
        setSelectedFile(event.target.files[0])
    }

    return isShowing ? ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal-overlay"/>
            <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className="modal">
                    <div className="modal-header">
                        Upload Sample
                    </div>
                    <div className="modal-body">
                        <div className="upload-file">
                            <label className="fileContainer">
                                    <div className="upload-text">{selectedFile ? selectedFile.name : 'Drop sample here or click to browse your filesystem.'}</div>
                                <input type="file" onChange={onChangeHandler}/>
                            </label>
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <button
                            type="button"
                            className="modal-button">
                            Upload
                        </button>
                        <button type="button"
                                className="modal-button"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={hide}>
                            Exit
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>, document.body
    ) : null;
}
export default Modal;
