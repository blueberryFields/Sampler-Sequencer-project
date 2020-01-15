import React, {useState} from "react";
import { Knob } from "react-rotary-knob";
import * as skins from "react-rotary-knob-skin-pack";
import LimitedKnob from "./LimitedKnob";


const MixerStrip = props => {

    const [volume, setVolume] = useState(0)
    const [pan, setPan] = useState(0)

    return (
        <div className="mixer-strip-container">
            {/*<Knob
                className="knob"
                skin={skins.s12}
                unlockDistance={0}
                min={-50}
                max={50}
                value={pan}
                onChange={(e) => setPan(e)}
            />*/}
            <LimitedKnob
                className="pan-knob"
                style={{ display: "inline-block" }}
                min={-50}
                max={50}
                unlockDistance={0}
                preciseMode={false}
                // value={pan}
                setPan={setPan}
                // onChange={(e) => setPan(e)}
                skin={skins.s13}
            />
            <div className="pan">{pan}</div>
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