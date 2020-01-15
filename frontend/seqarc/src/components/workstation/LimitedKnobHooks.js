import {Knob} from "react-rotary-knob";
import React, {useState} from "react";
import * as skins from "react-rotary-knob-skin-pack";
import LimitedKnob from "./LimitedKnob";


const LimitedKnobHooks = props => {

    const [value, setValue] = useState(0)

    const handleOnChange = (val) => {
        //ignore change if distance is greater than defined
        //here we use a distance of 200 because our max value is 1000
        //change if needed
        const maxDistance = 20;
        let distance = Math.abs(val - value);
        if (distance > maxDistance) {
            return;
        } else {
            setValue(val);
            props.setPan(Math.round(val))
        }
    }

    return (
        <Knob
            className="pan-knob"
            value={value}
            onChange={(val) => handleOnChange(val)}
            min={props.min}
            max={props.max}
            unlockDistance={props.unlockDistance}
            preciseMode={props.preciseMode}
            skin={props.skins}
        />
    )
}

export default LimitedKnobHooks