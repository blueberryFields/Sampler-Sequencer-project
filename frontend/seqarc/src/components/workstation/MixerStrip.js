import React, {useState, useEffect} from "react";
import * as skins from "react-rotary-knob-skin-pack";
import LimitedKnobHooks from "./LimitedKnobHooks";
import Tone from "tone";
import useInterval from "../hooks/useInterval";


const MixerStrip = props => {

    // destructure props
    const {changePan, changeVol, index} = props

    const [volume, setVolume] = useState(0)
    const [pan, setPan] = useState(0)
    const [level, setLevel] = useState(-Infinity)

    // const meter = new Tone.Meter()
    // props.instrument.connect(meter)

    useInterval(() => {
        setLevel(props.meter.getLevel())
        console.log(props.meter.getLevel())
    }, 10)

    useEffect(() => {
        changePan(index, pan)
    }, [pan, changePan, index])

    useEffect(() => {
        changeVol(index, volume)
    }, [volume, changeVol, index])

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
                <LimitedKnobHooks
                    style={{display: "inline-block"}}
                    min={-100}
                    max={100}
                    unlockDistance={0}
                    preciseMode={false}
                    skin={skins.s13}
                    setPan={setPan}
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
            <div className="meter-container">
                <div className="meter"
                     style={{height: level + 100}}/>
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