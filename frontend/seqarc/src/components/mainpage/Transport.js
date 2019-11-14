import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faStop} from '@fortawesome/free-solid-svg-icons'
import './mainpage.css'

const Transport = props => {

    const [playing, setPlaying] = useState(false)
    const [bpm, setBpm] = useState(120)
    const [swing, setSwing] = useState(0)

    const [currentTime, setCurrentTime] = useState(props.currentTime)

    const onPlay = () => {
        setPlaying(!playing)
        props.toggleTransport()
    }

    return (
        <div className="transport-bar">
            <div className="transport">
                <div className="display">
                    <div className="bpm-display">
                        <div className="bpm-heading">Bpm:</div>
                        <input className="bpm" value={bpm}/>
                    </div>
                    <div className="display-divider"/>
                    <div className="swing-display">
                        <div className="swing-heading">Swing:</div>
                        <input className="swing" value={swing}/>%
                    </div>
                    {/*<div className="time">{currentTime}</div>*/}
                </div>
                <button className="toggle-play" type="button" onClick={() => onPlay()}>
                    <FontAwesomeIcon icon={playing ? faStop : faPlay}/>
                </button>
            </div>
        </div>
    )
}

export default Transport