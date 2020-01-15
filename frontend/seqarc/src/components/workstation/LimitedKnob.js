import React, {useState} from "react";
import {render} from "react-dom";
import {Knob} from "react-rotary-knob";

const LimitedKnob = props => {

    const [value, setValue] = useState(0)

    const handleOnChange = (val) => {
        //ignore change if distance is greater than defined
        //here we use a distance of 200 because our max value is 1000
        //change if needed
        const maxDistance = 40;
        let distance = Math.abs(val - this.state.value);
        if (distance > maxDistance) {
            return;
        } else {
            setValue(val);
            props.setPan(Math.round(val))
        }
    }

    // let { value, ...rest } = this.props;

    return (
        <Knob value={value} onChange={handleOnChange}/>
    )

}

export default LimitedKnob