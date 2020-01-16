import React, {useState} from "react";
import { Knob } from "react-rotary-knob";
import * as skins from "react-rotary-knob-skin-pack";


const MixerStrip = props => {

    const [volume, setVolume] = useState(0)
    const [pan, setPan] = useState(0)

    return (
        <div className="mixer-strip-container">
            <Knob
                className="knob"
                skin={skins.s12}
                unlockDistance={0}
                min={-50}
                max={50}
                value={pan}
                precision={"off"}
                onChange={(e) => setPan(e)}
            />
            {/*<div className="pan">{pan}</div>*/}
            <div className="slider-container">
                <input
                    className="vol-slider"
                    type="range"
                    min="-127"
                    max="36"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}/>
            </div>
            <div className="volume">{volume + ' db'}</div>
        </div>
    )
}

export default MixerStrip