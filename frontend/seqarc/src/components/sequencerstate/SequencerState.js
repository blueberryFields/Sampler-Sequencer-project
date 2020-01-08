import Toolbar from "../toolbar/Toolbar";
import React, {useCallback, useState} from "react";
import Tone from "tone";
import {uuid} from "uuidv4";

const SequencerState = props => {

    // This contains all the instruments
    const [instruments, setInstruments] = useState([])

    const addNewInstrument = useCallback(() => {

        let instrument = new Tone.Sampler({
                'C3': 'samples/kick.wav'
            }
        ).toMaster()

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
                instrument,
                part,
                key: uuid()
            }
        ])
    }, [instruments])

    const deleteInstrument = (index) => {
        instruments[index].instrument.dispose()
        instruments[index].part.dispose()
        let newInstrumentArr = [...instruments]
        newInstrumentArr.splice(index, 1)
        setInstruments(newInstrumentArr)
    }

    // Methods for editing instruments and parts
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
        />
    )
}
export default  SequencerState
