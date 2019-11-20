import React, {useState} from 'react'
import './Workstation.css'
import Step from "./step";

const Instrument = props => {

    const [steps, setSteps] = useState([
        {id: 0, on: false},
        {id: 1, on: false},
        {id: 2, on: false},
        {id: 3, on: false},
        {id: 4, on: false},
        {id: 5, on: false},
        {id: 6, on: false},
        {id: 7, on: false},
        {id: 8, on: false},
        {id: 9, on: false},
        {id: 10, on: false},
        {id: 11, on: false},
        {id: 12, on: false},
        {id: 13, on: false},
        {id: 14, on: false},
        {id: 15, on: false}
    ])

    const toggleStepOn = (id) => {
        setSteps(steps.map(step => (step.id === id ? {id: step.id, on: !step.on} : step)))
        if (!steps[id].on) {
            props.addNote(props.index, id, 'C3')
        } else {
            props.removeNote(props.index, id, 'C3')
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
                    return <Step on={step.on} key={index} id={step.id} toggleStepOn={toggleStepOn}/>
                })}
            </div>
        </div>
    )
}

export default Instrument