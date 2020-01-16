import React from 'react'
import './Workstation.css'
import Step from "./Step";
import {faFileAudio, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Instrument = props => {

    const calculateLedStatus = (index) => {
        if (props.activeStep === index) {
            return props.steps[props.activeStep].on ? 'led-trigger' : 'led-active'
        }
        return props.steps[index].on ? 'led-on' : 'led-off'
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
                <div className="instr-name">
                    {props.name}
                </div>
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
                {props.steps.map((step, index) => {
                    return <Step
                        on={step.on}
                        note={step.note}
                        key={index}
                        instrumentIndex={props.index}
                        stepIndex={index}
                        toggleStepOn={props.toggleStepOn}
                        changeNoteValue={props.changeNoteValue}
                        ledStatus={calculateLedStatus(index)}
                        noteValues={props.noteValues}
                    />
                })}
            </div>
        </div>
    )
}

export default Instrument