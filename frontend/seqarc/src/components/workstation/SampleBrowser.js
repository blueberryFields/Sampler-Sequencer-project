import React, {useState, useEffect, useCallback} from 'react'
import './Workstation.css'
import {faHeadphones, faSearch, faTimes, faVolumeDown, faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useModal from "../hooks/useModal";
import UploadSampleModal from "./UploadSampleModal";
import Axios from 'axios-observable';

const SampleBrowser = (props) => {

    const [categories, setCategories] = useState([])

    const [categoriesIsLoading, setCategoriesIsLoading] = useState(true)

    useEffect(() => {
            Axios.get('http://127.0.0.1:80/api/category/findall')
            .subscribe(
                (response) => {
                    setCategories(response.data)
                    setCategoriesIsLoading(false)
                },
                error => console.log(error)
            );
    }, [])

    const [selectedCategory, setSelectedCategory] = useState('')

    const [samples, setSamples] = useState([])

    const [searchphrase, setSearchWord] = useState('')

    const getFilteredSamples = useCallback(() => {
        return Axios.get('http://127.0.0.1:80/api/sample/filteredsearch',
            {
                params: {
                    searchphrase,
                    category: selectedCategory
                }
            })
            .subscribe((response) => {
                    setSamples(response.data)
                },
                error => setSamples([]))
    }, [selectedCategory, searchphrase])

    const initSearch = () => {
        setSearchWord('')
    }

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            getFilteredSamples()
        }
    }

    useEffect(() => {
        if (!searchphrase) {
            getFilteredSamples()
        }
    }, [getFilteredSamples, searchphrase, selectedCategory])

    const handleCategory = (name) => {
        if (name === selectedCategory) {
            setSelectedCategory('')
        } else {
            setSelectedCategory(name)
        }
    }

    const [audition, setAudition] = useState(false)

    const [volInt, setVolInt] = useState(3)

    const volUp = () => {
        if (volInt < 4) setVolInt(volInt + 1)
    }

    const volDown = () => {
        if (volInt > 0) setVolInt(volInt - 1)
    }

    const {setAuditionVol} = props

    useEffect(() => {
        switch (volInt) {
            case 0:
                setAuditionVol(-36)
                break
            case 1:
                setAuditionVol(-24)
                break
            case 2:
                setAuditionVol(-12)
                break
            case 3:
                setAuditionVol(-6)
                break
            case 4:
                setAuditionVol(-1)
                break
            default:
                break
        }
    }, [volInt, setAuditionVol])

    const handleClickOnSample = (checksum, name) => {
        if (audition) props.auditSample(checksum)
        if (props.editSampleModeValue > -1) {
            props.selectInstrumentSample(checksum, name)
        }
    }

    // Upload Sample-modal stuff
    const {uploadModalIsShowing, uploadModalToggle} = useModal();

    return (
        <div className="sample-browser-container">
            <div className="filter">
                <div className="search">
                    <FontAwesomeIcon
                        className="search-icon"
                        icon={faSearch}
                        onClick={() => getFilteredSamples()}
                    />
                    <input
                        className="search-field"
                        value={searchphrase}
                        placeholder="Search..."
                        type="text"
                        onChange={(e) => setSearchWord(e.target.value)}
                        onKeyDown={(e) => handleEnterSearch(e)}
                    />
                    <FontAwesomeIcon
                        className="search-icon"
                        icon={faTimes}
                        onClick={() => initSearch()}
                    />
                </div>
                <div className="categories">
                    {
                        categoriesIsLoading ? <div>Loading!</div> :
                            categories.map((category, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`category ${selectedCategory === category.category ? ' cat-selected' : ' cat-not-selected'}`}
                                        onClick={() => handleCategory(category.category)}
                                    >
                                        {category.category}
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Duration</th>
                    <th>User</th>
                </tr>
                </thead>
                <tbody>
                {
                    samples.map((sample, index) => {
                        return <tr
                            key={index}
                            onClick={() => handleClickOnSample(sample.checksum, sample.name)}>
                            <td>{sample.name}</td>
                            <td>{sample.duration} sec</td>
                            <td>{sample.user.username}</td>
                        </tr>
                    })
                }
                </tbody>
            </table>
            <div className="browser-footer">
                <div className="browser-footer-buttons">
                    {props.token ? <div
                        className="browser-footer-button"
                        onClick={uploadModalToggle}>
                        Upload
                    </div> : <div/>}

                    <UploadSampleModal
                        token={props.token}
                        isShowing={uploadModalIsShowing}
                        hide={uploadModalToggle}
                        getFilteredSamples={getFilteredSamples}
                    />
                </div>
                <FontAwesomeIcon
                    className={`audition-icon ${audition ? 'audition-on': 'audition-off'}`}
                    icon={faHeadphones}
                    onClick={() => setAudition(!audition)}
                />
                <div className="audition-vol">
                    <FontAwesomeIcon
                        className="volume-icon"
                        icon={faVolumeDown}
                        onClick={() => volDown()}
                    />
                    <div className="vol-ticks">
                        <div className={`vol-tick vol-tick-0 vol-tick-${volInt >= 0 ? 'on' : 'off'}`}/>
                        <div className={`vol-tick vol-tick-1 vol-tick-${volInt >= 1 ? 'on' : 'off'}`}/>
                        <div className={`vol-tick vol-tick-2 vol-tick-${volInt >= 2 ? 'on' : 'off'}`}/>
                        <div className={`vol-tick vol-tick-3 vol-tick-${volInt >= 3 ? 'on' : 'off'}`}/>
                        <div className={`vol-tick vol-tick-4 vol-tick-${volInt >= 4 ? 'on' : 'off'}`}/>
                    </div>
                    <FontAwesomeIcon
                        className="volume-icon"
                        icon={faVolumeUp}
                        onClick={() => volUp()}
                    />
                </div>
            </div>
        </div>
    )
}

export default SampleBrowser