import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './Workstation.css'
import Axios from "axios-observable";

const Modal = ({isShowing, hide, getFilteredSamples}) => {

    const [categories, setCategories] = useState([])

    const [categoriesIsLoading, setCategoriesIsLoading] = useState(true)

    const [selectedFile, setSelectedFile] = useState(null)

    const [sampleName, setSampleName] = useState('')

    const [selectedCategory, setSelectedCategory] = useState('')

    const [message, setMessage] = useState('')

    const upLoadSample = () => {
        if (selectedFile && selectedCategory && sampleName) {

            const bodyFormData = new FormData();
            bodyFormData.set('name', sampleName);
            bodyFormData.set('category', selectedCategory);
            bodyFormData.append('file', selectedFile);

            Axios.request({
                method: 'post',
                url: 'http://localhost:8080/sample/upload',
                data: bodyFormData,
                headers: {'Content-Type': 'multipart/form-data'}
            })
                .subscribe(
                    response => {
                        setSelectedFile(null)
                        setSelectedCategory('')
                        setSampleName('')
                        setMessage("Sample successfully uploaded!")
                        getFilteredSamples()
                    },
                    error => {
                        console.log(error)
                        setMessage("Sample upload failed!")
                    }
                );

            if (message) setMessage('')
        } else {
            setMessage("Something is missing!")
        }
    }

    const handleExit = () => {
        setSelectedFile(null)
        setSelectedCategory('')
        setSampleName('')
        setMessage('')
        hide()
    }

    useEffect(() => {
        Axios.get('http://localhost:8080/category/findall')
            .subscribe(
                (response) => {
                    setCategories(response.data)
                    setCategoriesIsLoading(false)
                },
                error => console.log(error)
            );
    }, [])

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
                                <div
                                    className="upload-text">{selectedFile ? selectedFile.name : 'Drop sample here or click to browse your filesystem.'}</div>
                                <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])}/>
                            </label>
                        </div>
                    </div>
                    <div className="upload-modal-inputs">
                        <input
                            className="name-input"
                            type="text"
                            value={sampleName}
                            onChange={(e) => setSampleName(e.target.value)}
                            placeholder="Name"
                        />
                        <select
                            className="category-chooser"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}>
                            {/*<FontAwesomeIcon icon={faCaretDown} />*/}
                            <option value="">Choose Category</option>
                            {
                                categories.map((category, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={category.category}
                                        >
                                            {category.category}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="message">
                        {message}
                    </div>
                    <div className="modal-buttons">
                        <button
                            type="button"
                            className="modal-button"
                            onClick={() => upLoadSample()}
                        >
                            Upload
                        </button>
                        <button type="button"
                                className="modal-button"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => handleExit()}>
                            Exit
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>, document.body
    ) : null;
}
export default Modal;
