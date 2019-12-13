import React, {useState, useEffect, useCallback} from 'react'
import './Workstation.css'
import {faHeadphones, faSearch, faTimes, faVolumeDown, faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useModal from "../hooks/useModal";
import UploadSampleModal from "./UploadSampleModal";
import Axios from 'axios-observable';

const SampleBrowser = props => {

    const [categories, setCategories] = useState([])

    const [categoriesIsLoading, setCategoriesIsLoading] = useState(true)

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

    const [category, setCategory] = useState('')

    const [samples, setSamples] = useState([])

    const [searchphrase, setSearchWord] = useState('')

    const getFilteredSamples = useCallback(() => {
        return Axios.get('http://localhost:8080/sample/filteredsearch',
            {
                params: {
                    searchphrase,
                    category
                }
            })
            .subscribe((response) => {
                    setSamples(response.data)
                },
                error => setSamples([]))
    }, [category, searchphrase])

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
    }, [getFilteredSamples, searchphrase, category])

    const handleCategory = (name) => {
        if (name === category) {
            setCategory('')
        } else {
            setCategory(name)
        }
    }

    const categoryClass = (name) => {
        let categoryClass = 'category'
        let selectedClass = category === name ? ' cat-selected' : ' cat-not-selected'
        return categoryClass + selectedClass
    }

    const [audition, setAudition] = useState(false)
    const [auditionClass, setAuditionClass] = useState('audition-icon audition-off')

    useEffect(() => {
        audition ? setAuditionClass('audition-icon audition-on') : setAuditionClass('audition-icon audition-off')
    }, [audition])

    const [volInt, setVolInt] = useState(3)

    const volUp = () => {
        if (volInt < 4) setVolInt(volInt + 1)
    }

    const volDown = () => {
        if (volInt > 0) setVolInt(volInt - 1)
    }

    const [auditVolClass, setAuditVolClass] = useState([
        'vol-tick vol-tick-0 vol-tick-on',
        'vol-tick vol-tick-1 vol-tick-on',
        'vol-tick vol-tick-2 vol-tick-on',
        'vol-tick vol-tick-3 vol-tick-off',
        'vol-tick vol-tick-4 vol-tick-off',
    ])

    useEffect(() => {
        let classBase = 'vol-tick vol-tick-'
        let newAuditVolClassArr = auditVolClass.map((element, index) => index <= volInt ? classBase + index + ' vol-tick-on' : classBase + index + ' vol-tick-off')
        setAuditVolClass(newAuditVolClassArr)

        switch (volInt) {
            case 0:
                props.setAuditionVol(-36)
                break
            case 1:
                props.setAuditionVol(-24)
                break
            case 2:
                props.setAuditionVol(-12)
                break
            case 3:
                props.setAuditionVol(-6)
                break
            case 4:
                props.setAuditionVol(-1)
                break
            default:
                break
        }


    }, [volInt])

    const handleClickOnSample = (checksum) => {
        if (audition) props.auditSample(checksum)
        if (props.editSampleModeValue > -1) {
            props.selectInstrumentSample(checksum)
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
                                        className={categoryClass(category.category)}
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
                            onClick={() => handleClickOnSample(sample.checksum)}>
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
                    <div
                        className="browser-footer-button"
                        onClick={uploadModalToggle}>
                        Upload Sample
                    </div>
                    <UploadSampleModal
                        isShowing={uploadModalIsShowing}
                        hide={uploadModalToggle}
                        getFilteredSamples={getFilteredSamples}
                        testMessage={'hej'}
                    />
                    <div className="browser-footer-button">Record Sample</div>
                </div>
                <FontAwesomeIcon
                    className={auditionClass}
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
                        <div className={auditVolClass[0]}/>
                        <div className={auditVolClass[1]}/>
                        <div className={auditVolClass[2]}/>
                        <div className={auditVolClass[3]}/>
                        <div className={auditVolClass[4]}/>
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