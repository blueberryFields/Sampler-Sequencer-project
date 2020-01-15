import React, {useState, useEffect} from "react";
import * as skins from "react-rotary-knob-skin-pack";
import LimitedKnob from "./LimitedKnob";


const MixerStrip = props => {

    const [volume, setVolume] = useState(0)
    const [pan, setPan] = useState(0)

    useEffect(() => {
        props.changePan(props.index, pan)
    })

    useEffect(() => {
        props.changeVol(props.index, volume)
    })

    const lorR = (panVal) => {
        if (panVal < 0) {
            return 'L'
        } else if (panVal > 0) {
            return 'R'
        } else {
            return ''
        }
    }

    return (
        <div className="mixer-strip-container">
            <div className="pan-container">
                <LimitedKnob
                    className="pan-knob"
                    style={{display: "inline-block"}}
                    min={-100}
                    max={100}
                    unlockDistance={0}
                    preciseMode={false}
                    // value={pan}
                    setPan={setPan}
                    // onChange={(e) => setPan(e)}
                    skin={skins.s13}
                />
                <div className="pan">{lorR(pan)} {pan}</div>
            </div>
            <div className="slider-container">
                <input
                    className="vol-slider"
                    type="range"
                    min="-36"
                    max="12"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}/>
            </div>
            <div className="volume">{volume + ' db'}</div>
            <div className="mix-strip-pad">
                <div className="mix-strip-number">
                    {props.index + 1}
                </div>
            </div>
        </div>
    )
}

export default MixerStrip