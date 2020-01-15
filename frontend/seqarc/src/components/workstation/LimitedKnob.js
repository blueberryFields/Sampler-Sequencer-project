import React from "react";
import { render } from "react-dom";
import { Knob } from "react-rotary-knob";

// const styles = {
//     fontFamily: "sans-serif",
//     textAlign: "center",
//     marginTop: "6rem"
// };

class LimitedKnob extends React.Component {
    constructor() {
        super();
        this.state = {
            value: 0
        };
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(val) {
        //ignore change if distance is greater than defined
        //here we use a distance of 200 because our max value is 1000
        //change if needed
        const maxDistance = 20;
        let distance = Math.abs(val - this.state.value);
        if (distance > maxDistance) {
            return;
        } else {
            this.setState({ value: val });
            this.props.setPan(Math.round(val))
        }
    }
    render() {
        let { value, ...rest } = this.props;

        return (
            <Knob value={this.state.value} onChange={this.handleOnChange} {...rest} />
        );
    }
}

export default LimitedKnob