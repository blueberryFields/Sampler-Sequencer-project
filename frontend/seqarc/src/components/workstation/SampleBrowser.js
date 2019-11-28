import React, {useState, useEffect} from 'react'
import './Workstation.css'
import {faHeadphones, faSearch, faTimes, faVolumeDown, faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useModal from "../hooks/useModal";
import UploadSampleModal from "./UploadSampleModal";

const SampleBrowser = props => {

    const fakeSampleData = [
        {
            id: 1,
            name: 'hihat',
            category: 'hihat',
            duration: '0.102',
            fileExtension: 'wav',
            user: 'SeqArc'
        },
        {
            id: 2,
            name: 'hihat2',
            category: 'hihat',
            duration: '0.45',
            fileExtension: 'wav',
            user: 'SeqArc'
        },
        {
            id: 3,
            name: 'kick',
            category: 'bassdrum',
            duration: '0.062',
            fileExtension: 'wav',
            user: 'SeqArc'

        },
        {
            id: 4,
            name: 'snare',
            category: 'bassdrum',
            duration: '0.126',
            fileExtension: 'wav',
            user: 'SeqArc'
        },
    ]

    const fakeCategoryData = [
        {name: 'hihat'},
        {name: 'bassdrum'},
        {name: 'snare'},
        {name: 'kick'},
        {name: 'synth'},
        {name: 'guitar'}
    ]

    const [searchWord, setSearchWord] = useState('')

    const initSearch = () => {
        setSearchWord('')
    }

    const [categoryFilter, setCategoryFilter] = useState('')

    const handleCategory = (name) => {
        if (name === categoryFilter) {
            setCategoryFilter('')
        } else {
            setCategoryFilter(name)
        }
    }

    const categoryClass = (name) => {
        let categoryClass = 'category'
        let selectedClass = categoryFilter === name ? ' cat-selected' : ' cat-not-selected'
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

    const handleClickOnSample = (name, fileExtension) => {
        if (audition) props.auditSample(name, fileExtension)
        if (props.editSampleModeValue > -1) {
            props.selectInstrumentSample(name, fileExtension)
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
                        // onClick={() => search()}
                    />
                    <input
                        className="search-field"
                        value={searchWord}
                        placeholder="Search..."
                        type="text"
                        onChange={(e) => setSearchWord(e.target.value)}
                    />
                    <FontAwesomeIcon
                        className="search-icon"
                        icon={faTimes}
                        onClick={() => initSearch()}
                    />
                </div>
                <div className="categories">
                    {
                        fakeCategoryData.map((category, index) => {
                            return (
                                <div
                                    key={index}
                                    className={categoryClass(category.name)}
                                    onClick={() => handleCategory(category.name)}
                                >
                                    {category.name}
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
                    <th>Format</th>
                    <th>Duration</th>
                    <th>User</th>
                </tr>
                </thead>
                <tbody>
                {
                    fakeSampleData.map((sample, index) => {
                        return <tr
                            key={index}
                            onClick={() => handleClickOnSample(sample.name, sample.fileExtension)}>
                            <td>{sample.name}</td>
                            <td>.{sample.fileExtension}</td>
                            <td>{sample.duration} sec</td>
                            <td>{sample.user}</td>
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