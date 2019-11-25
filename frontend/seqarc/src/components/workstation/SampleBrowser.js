import React, {useState, useEffect} from 'react'
import './Workstation.css'
import {faHeadphones, faPlus, faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SampleBrowser = props => {

    const fakeSampleData = [
        {
            id: 1,
            name: 'hihat',
            category: 'hihat',
            duration: '0.102',
            fileExtension: 'wav',
        },
        {
            id: 2,
            name: 'hihat2',
            category: 'hihat',
            duration: '0.45',
            fileExtension: 'wav',
        },
        {
            id: 3,
            name: 'kick',
            category: 'bassdrum',
            duration: '0.062',
            fileExtension: 'wav',

        },
        {
            id: 4,
            name: 'snare',
            category: 'bassdrum',
            duration: '0.126',
            fileExtension: 'wav',

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

    const [audition, setAudition] = useState(false)
    const [auditionClass, setAuditionClass] = useState('audition-icon audition-off')

    useEffect(() => {
        audition ? setAuditionClass('audition-icon audition-on') : setAuditionClass('audition-icon audition-off')
    }, [audition])

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
                            return <div key={index} className="category cat-not-selected">{category.name}</div>
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
                </tr>
                </thead>
                <tbody>
                {
                    fakeSampleData.map((sample, index) => {
                        return <tr key={index} onClick={() => {
                            if (audition) props.auditSample(sample.name, sample.fileExtension)
                        }}>
                            <td>{sample.name}</td>
                            <td>.{sample.fileExtension}</td>
                            <td>{sample.duration} sec</td>
                        </tr>
                    })
                }
                </tbody>
            </table>
            <div className="browser-footer">
                <FontAwesomeIcon
                    className={auditionClass}
                    icon={faHeadphones}
                    onClick={() => setAudition(!audition)}
                />
            </div>
        </div>
    )
}

export default SampleBrowser