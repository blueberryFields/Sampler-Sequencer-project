import React, {useState, useEffect} from "react";
import * as skins from "react-rotary-knob-skin-pack";
import LimitedKnobHooks from "./LimitedKnobHooks";
import useInterval from "../hooks/useInterval";


const MixerStrip = props => {

    // destructure props
    const {changePan, changeVol, index} = props

    const [volume, setVolume] = useState(0)
    const [pan, setPan] = useState(0)
    const [meter, setMeter] = useState(0)
    const [timerDelay, setTimerDelay] = useState(null)

    useEffect(() => {
        if (props.activeStep > -1) {
            setTimerDelay(10)
        } else {
            setTimeout(() => setTimerDelay(null), 1000)
        }
    }, [props.activeStep, setTimerDelay])

    useInterval(() => {
        setMeter(calcMeterHeight(props.meter.getLevel()))
    }, timerDelay)

    const calcMeterHeight = (level) => {
        if (level >= -32 && level < 0) {
            return 8 + (level / 4)
        } else if (level === 0) {
            return 8
        } else if (level > 0) {
            return 8 + Math.abs((level / 4))
        } else {
            return 0
        }
    }

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
                    setPan={setPan}/>
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
                     style={{
                         height: meter + 'rem',
                         background: meter > 8 ? 'red' : '#66ff66'
                     }}/>
            </div>
            <div className="volume">{volume + ' db'}</div>
            <div
                className="mix-strip-pad"
                onClick={() => props.triggerInstrument(props.index)}>
                <div className="mix-strip-number">
                    {props.index + 1}
                </div>
            </div>
        </div>
    )
}

export default MixerStrip