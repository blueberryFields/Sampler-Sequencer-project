import React, {useState} from 'react'
import './Workstation.css'
import Step from "./Step";
import {faFileAudio, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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

    const calculateLedStatus = (index) => {
        if (props.activeStep === index) {
            return steps[props.activeStep] ? 'led-trigger' : 'led-active'
        }
        return steps[index] ? 'led-on' : 'led-off'
    }

    const noteValues = [
    'C2',
    'Db2',
    'D2',
    'Eb2',
    'E2',
    'Fb2',
    'F2',
    'Gb2',
    'G2',
    'Ab2',
    'A2',
    'Bb2',
    'B2',
    'C3',
    'C#3',
    'D3',
    'D#3',
    'E3',
    'E#3',
    'F3',
    'F#3',
    'G3',
    'G#3',
    'A3',
    'A#3',
    'B3',
    'C4',
]


    const toggleStepOn = (index, note) => {
        let newArray = [...steps]
        newArray[index] = !steps[index]
        setSteps(newArray)
        if (!steps[index]) {
            props.addNote(props.index, index, noteValues[note])
        } else {
            props.removeNote(props.index, index, noteValues[note])
        }
    }

    const changeNoteValue = (index, note) => {
        console.log('change note: index: ' + index +', note: ' + note)
        if (steps[index]) {
            props.removeNote(props.index, index)
            props.addNote(props.index, index, noteValues[note])
        }
    }

    const [name, setName] = useState(props.name)

    const updateName = () => {
        if (name !== props.name) props.updateInstrumentName(props.index, name)
    }
    const handleClickOnEditSample = () => {
        if (props.editSampleModeValue !== props.index) {
            props.setEditSampleModeValue(props.index)
        } else {
            props.setEditSampleModeValue(-1)
        }
    }

    return (
        <div className="instrument-container">
            <div className="instr-header">
                <div
                    className="trigger-button"
                    onClick={() => props.triggerInstrument(props.index)}
                >
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
                <div className="instrument-icons">
                    <FontAwesomeIcon
                        className={props.editSampleModeValue === props.index ? 'edit-sample-button edit-sample-button-on' : 'edit-sample-button edit-sample-button-off'}
                        icon={faFileAudio}
                        onClick={() => handleClickOnEditSample()}
                    />
                    <FontAwesomeIcon
                        className="delete-instrument"
                        icon={faTimes}
                        onClick={() => props.deleteInstrument(props.index)}
                    />
                </div>
            </div>
            <div className="steps">
                {steps.map((step, index) => {
                    return <Step
                        on={step.on}
                        key={index}
                        index={index}
                        toggleStepOn={toggleStepOn}
                        changeNoteValue={changeNoteValue}
                        ledStatus={calculateLedStatus(index)}
                        noteValues={noteValues}
                    />
                })}
            </div>
        </div>
    )
}

export default Instrument