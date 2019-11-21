import React, {useState, useEffect} from 'react'
import './Workstation.css'
import Step from "./step";

const Instrument = props => {

    const [steps, setSteps] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ])

    const [ledStatus, setLedStatus] = useState([
        'led-off',
        'led-off',
        'led-off',
        'led-off',
        'led-off',
        'led-off',
        'led-off',
        'led-off',
        'led-off',
        'led-off',
        'led-off',
        'led-off',
        'led-off',
        'led-off',
        'led-off',
        'led-off'
    ])

    // Update led-status when stepping through the steps
    useEffect(() => {
        let newLedStatusArray = [...ledStatus]
        steps[props.activeStep] ? newLedStatusArray[props.activeStep] = 'led-trigger' : newLedStatusArray[props.activeStep] = 'led-active'
        if (props.activeStep > 0) {
            steps[props.activeStep - 1] ? newLedStatusArray[props.activeStep - 1] = 'led-on' : newLedStatusArray[props.activeStep - 1] = 'led-off'
        } else if (props.activeStep === 0) {
            steps[props.activeStep - 1] ? newLedStatusArray[steps.length - 1] = 'led-on' : newLedStatusArray[steps.length -1] = 'led-off'
        } else if(props.activeStep === -1) {
            newLedStatusArray = newLedStatusArray.map((status, index) => steps[index] ? 'led-on' : 'led-off')
        }
        setLedStatus(newLedStatusArray)

    }, [props.activeStep])

    const updateLedStatus = ((index, status) => {
        let newArray = [...ledStatus]
        newArray[index] = status
        setLedStatus(newArray)
    })

    const toggleStepOn = (index) => {
        let newArray = [...steps]
        newArray[index] = !steps[index]
        setSteps(newArray)
        if (!steps[index]) {
            props.addNote(props.index, index, 'C3')
            updateLedStatus(index, 'led-on')
        } else {
            props.removeNote(props.index, index, 'C3')
            updateLedStatus(index, 'led-off')
        }
    }

    const [name, setName] = useState(props.name)

    const updateName = () => {
        if (name !== props.name) props.updateInstrumentName(props.index, name)
    }

    return (
        <div className="instrument-container">
            <div className="instr-header">
                <div className="trigger-button">
                    <div className="instr-number">{props.index + 1}</div>
                </div>
                <input
                    className="instr-name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            updateName()
                        }
                    }}
                    onBlur={() => updateName()}
                />
            </div>
            <div className="steps">
                {steps.map((step, index) => {
                    return <Step
                        on={step.on}
                        key={index}
                        index={index}
                        toggleStepOn={toggleStepOn}
                        ledStatus={ledStatus[index]}
                    />
                })}
            </div>
        </div>
    )
}

export default Instrument