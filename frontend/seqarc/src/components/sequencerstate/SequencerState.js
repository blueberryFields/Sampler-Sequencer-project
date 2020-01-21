import Toolbar from "../toolbar/Toolbar";
import React, {useCallback, useState} from "react";
import Tone from "tone";
import {uuid} from "uuidv4";

const SequencerState = props => {

    // This contains all the instruments
    const [instruments, setInstruments] = useState([])

    // This is the available note values. C# + - 1 octave
    const noteValues = [
        'C2',
        'Db2',
        'D2',
        'Eb2',
        'E2',
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
        'F3',
        'F#3',
        'G3',
        'G#3',
        'A3',
        'A#3',
        'B3',
        'C4',
    ]

    const addNewInstrument = useCallback(() => {

        setEditSampleModeValue(-1)

        // create pan/vol-node
        let panVol = new Tone.PanVol(0, 0)

        // Create meter
        let meter = new Tone.Meter()

        // create instrument and chain to pan/vol-node
        let instrument = new Tone.Sampler({
                'C3': 'samples/kick.wav'
            }
        ).chain(panVol, meter, Tone.Master)

        // pass in an array of events
        let part = new Tone.Part(function (time, event) {
            //the events will be given to the callback with the time they occur
            if (instrument.loaded) instrument.triggerAttack(event.note, time)
        }, [])

        //start the part at the beginning of the Transport's timeline
        part.start(0)
        part.loop = true
        part.loopEnd = '1n'

        setInstruments([
            ...instruments,
            {
                name: 'Instr ' + (instruments.length + 1),
                meter,
                panVol,
                instrument,
                part,
                key: uuid(),
                steps:
                    [
                        {
                            on: false,
                            note: 12
                        },
                        {
                            on: false,
                            note: 12
                        },
                        {
                            on: false,
                            note: 12
                        },
                        {
                            on: false,
                            note: 12
                        },
                        {
                            on: false,
                            note: 12
                        },
                        {
                            on: false,
                            note: 12
                        },
                        {
                            on: false,
                            note: 12
                        },
                        {
                            on: false,
                            note: 12
                        },
                        {
                            on: false,
                            note: 12
                        },
                        {
                            on: false,
                            note: 12
                        },
                        {
                            on: false,
                            note: 12
                        },
                        {
                            on: false,
                            note: 12
                        },
                        {
                            on: false,
                            note: 12
                        },
                        {
                            on: false,
                            note: 12
                        },
                        {
                            on: false,
                            note: 12
                        },
                        {
                            on: false,
                            note: 12
                        },
                    ],
            }
        ])
    }, [instruments])

    // Methods for editing instruments and parts

    const initialize = () => {
        instruments.forEach((instrument, index) => deleteInstrument(index))
        setInstruments([])
    }

    const toggleStepOn = (instrumentIndex, stepIndex, note) => {
        let newArray = [...instruments]
        newArray[instrumentIndex].steps[stepIndex].on = !instruments[instrumentIndex].steps[stepIndex].on
        setInstruments(newArray)
        if (instruments[instrumentIndex].steps[stepIndex].on) {
            addNote(instrumentIndex, stepIndex, noteValues[note])
        } else {
            removeNote(instrumentIndex, stepIndex, noteValues[note])
        }
    }

    const changeVol = (instrumentIndex, val) => {
        instruments[instrumentIndex].panVol.volume.value = val
    }

    const changePan = (instrumentIndex, val) => {
        instruments[instrumentIndex].panVol.pan.value = val/100
    }

    const changeNoteValue = (instrumentIndex, stepIndex, note) => {
        let newArray = [...instruments]
        newArray[instrumentIndex].steps[stepIndex].note = note
        setInstruments(newArray)
        if (instruments[instrumentIndex].steps[stepIndex].on) {
            removeNote(instrumentIndex, stepIndex)
            addNote(instrumentIndex, stepIndex, noteValues[note])
        }
    }

    const deleteInstrument = (index) => {
        setEditSampleModeValue(-1)
        instruments[index].instrument.dispose()
        instruments[index].part.dispose()
        instruments[index].panVol.dispose()
        instruments[index].meter.dispose()
        let newInstrumentArr = [...instruments]
        newInstrumentArr.splice(index, 1)
        setInstruments(newInstrumentArr)
    }

    // If set to > -1 we are in editSampleMode and the value represents which instrument is being edited
    const [editSampleModeValue, setEditSampleModeValue] = useState(-1)

    const selectInstrumentSample = (checksum, name) => {
        let newInstrArray = [...instruments]
        newInstrArray[editSampleModeValue].loaded = false
        newInstrArray[editSampleModeValue].instrument.add('C3', `samples/${checksum}`)
        newInstrArray[editSampleModeValue].name = name

        setInstruments(newInstrArray)
    }

    const addNote = (instrIndex, notePosition, noteValue) => {
        instruments[instrIndex].part.add(
            {time: {'16n': notePosition}, note: noteValue}
        )
    }

    const removeNote = (instrIndex, notePosition) => {
        instruments[instrIndex].part.remove(
            {'16n': notePosition}
        )
    }

    return (
        <Toolbar
            instruments={instruments}
            addNewInstrument={addNewInstrument}
            deleteInstrument={deleteInstrument}
            addNote={addNote}
            removeNote={removeNote}
            selectInstrumentSample={selectInstrumentSample}
            editSampleModeValue={editSampleModeValue}
            setEditSampleModeValue={setEditSampleModeValue}
            toggleStepOn={toggleStepOn}
            changeNoteValue={changeNoteValue}
            noteValues={noteValues}
            initialize={initialize}
            changeVol={changeVol}
            changePan={changePan}
        />
    )
}
export default SequencerState
