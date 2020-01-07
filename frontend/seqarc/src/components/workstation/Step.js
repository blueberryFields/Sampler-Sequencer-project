import React, {useState, useEffect} from 'react'
import './Workstation.css'
import {faCaretUp, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Step = props => {

    const [note, setNote] = useState(13)

    const {changeNoteValue} = props

    useEffect(() => {
        changeNoteValue(props.index, note)
    }, [note])

    return (
        <div
            className={props.index === 0 || props.index === 4 || props.index === 8 || props.index === 12 ? 'step on-beat' : 'step'}>
            <div className="led-container" onClick={() => props.toggleStepOn(props.index, note)}>
                <div className={props.ledStatus}/>
            </div>
            <div className="note-container">
                <div className="note-value">{props.noteValues[note]}</div>
                <div className="note-change-container">
                    <FontAwesomeIcon
                        className="note-up"
                        icon={faCaretUp}
                        onClick={() => {
                            if (note < 26) {
                                setNote(note + 1)
                            }
                        }
                        }
                    />
                    <FontAwesomeIcon
                        className="note-down"
                        icon={faCaretDown}
                        onClick={() => {
                            if (note > 0) {
                                setNote(note - 1)
                                props.changeNoteValue(props.index, note)
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

