import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faStop} from '@fortawesome/free-solid-svg-icons'
import './mainpage.css'

const Transport = props => {

    const convertPercentToFloat = (percent) => {
        return percent / 100
    }

    const convertFloatToPercent = (float) => {
        return float * 100
    }

    const [playing, setPlaying] = useState(false)

    const onPlay = () => {
        setPlaying(!playing)
        props.toggleTransport()
    }

    const [bpm, setBpm] = useState(props.getBpm)

    const updateBpm = () => {
        if (!isNaN(bpm) && bpm > 0 && bpm < 300) {
            props.updateBpm(bpm)
        } else {
            setBpm(props.getBpm)
        }
    }

    const [swing, setSwing] = useState(convertFloatToPercent(props.getSwing))

    const updateSwing = () => {
        if (swing && !isNaN(swing) && swing >= 0 && swing <= 100) {
            props.updateSwing(convertPercentToFloat(swing))
        } else {
            setSwing(convertFloatToPercent(props.getSwing))
        }
    }

    return (
        <div className="transport-bar">
            <div className="transport">
                <div className="display">
                    <div className="display-part">
                        <div className="bpm-heading">Bpm:</div>
                        <input type="text"
                               className="bpm"
                               name="bpm"
                               value={bpm}
                               onChange={(e) => setBpm(e.target.value)}
                               onKeyPress={(e) => {
                                   if (e.key === 'Enter') {
                                       updateBpm()
                                   }
                               }}
                               onBlur={() => updateBpm()}
                        />
                    </div>
                    <div className="display-divider"/>
                    <div className="display-part">
                        <div className="swing-heading">Swing:</div>
                        <input type="text"
                               className="swing"
                               name="swing"
                               value={swing}
                               onChange={(e) => setSwing(e.target.value)}
                               onKeyPress={(e) => {
                                   if (e.key === 'Enter') {
                                       updateSwing()
                                   }
                               }}
                               onBlur={() => updateSwing()}/>
                               <div className="percent-char">%</div>
                    </div>
                    <div className="display-divider"/>
                    <div className="display-part">
                        <div className="position">
                            {props.position}
                        </div>
                    </div>
                </div>
                <button className="toggle-play" type="button" onClick={() => onPlay()}>
                    <FontAwesomeIcon icon={playing ? faStop : faPlay}/>
                </button>
            </div>
        </div>
    )
}

export default Transport