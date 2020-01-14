import React from 'react'
import './Workstation.css'
import {faCaretUp, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Step = props => {

    return (
        <div
            className={props.stepIndex === 0 || props.stepIndex === 4 || props.stepIndex === 8 || props.stepIndex === 12 ? 'step on-beat' : 'step'}>
            <div className="led-container" onClick={() => props.toggleStepOn(props.instrumentIndex, props.stepIndex, props.note)}>
                <div className={props.ledStatus}/>
            </div>
            <div className="note-container">
                <div className="note-value">{props.noteValues[props.note]}</div>
                <div className="note-change-container">
                    <FontAwesomeIcon
                        className="note-up"
                        icon={faCaretUp}
                        onClick={() => {
                            if (props.note < 24) {
                                props.changeNoteValue(props.instrumentIndex, props.stepIndex, props.note + 1)
                            }
                        }
                        }
                    />
                    <FontAwesomeIcon
                        className="note-down"
                        icon={faCaretDown}
                        onClick={() => {
                            if (props.note > 0) {
                                props.changeNoteValue(props.instrumentIndex, props.stepIndex, props.note - 1)
                            }
                        }
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default Step

