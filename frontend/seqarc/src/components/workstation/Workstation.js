import React, {useState, useEffect, useRef, useCallback} from 'react'
import Tone from 'tone'
import Transport from "./Transport";
import Instrument from "./Instrument";
import SampleBrowser from "./SampleBrowser";
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { uuid } from 'uuidv4';

const Workstation = props => {

    // Transport-related stuff

    const [position, setPosition] = useState(Tone.Transport.position)

    const [playing, setPlaying] = useState(false)

    const formatPosition = (position) => {
        return position.split(":")[0] + ':' + position.split(":")[1] + ':' + parseFloat(position.split(":")[2]).toFixed(0)
    }

    const [bpm, setBpm] = useState(Tone.Transport.bpm.value)

    const updateBpm = (bpm) => {
        Tone.Transport.bpm.value = bpm
        setBpm(bpm)
    }

    const [swing, setSwing] = useState(Tone.Transport.swing)

    const updateSwing = (swing) => {
        Tone.Transport.swing = swing
        setSwing(swing)
    }

    const toggleTransport = () => {
        Tone.Transport.toggle()
        if (playing) {
            setPosition(formatPosition(Tone.Transport.position))
            // Timeout required else sometimes the scheduled stepForward will fire after activeStep set to -1 which lead
            // to led lights remaining lit on step 0
            setTimeout(() => setActiveStep(-1), 50)
        }
        setPlaying(!playing)
    }

    // ACTIVE STEPS
    // Keeps track of active steps which Instrument listens to and lights LEDs accordingly
    const [activeStep, setActiveStep] = useState(-1)

    const stepForward = useCallback(() => {
        stepperRef.current < 15 ? setActiveStep(stepperRef.current + 1) : setActiveStep(0)
        setPosition(formatPosition(Tone.Transport.position))
    }, [])

    useEffect(() => {
        Tone.Transport.scheduleRepeat(stepForward, '16n')
    }, [stepForward])


    const stepperRef = useRef(activeStep)

    useEffect(
        () => {
            stepperRef.current = activeStep
        },
        [activeStep]
    )

    // This contains all the instruments
    const [instruments, setInstruments] = useState([])

    // Add new Instruments
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

    // Sample-auditioner

    const auditionVol = useRef(new Tone.Volume(-6))
    const sampleAuditioner = useRef(new Tone.Player().chain(auditionVol.current, Tone.Master))

    const setAuditionVol = (decibel) => {
        auditionVol.current.volume.value = decibel
    }

    const auditSample = (name) => {
        sampleAuditioner.current.load(
            `samples/${name}`,
            () => {
                sampleAuditioner.current.start()
            }
        )
    }

    // Instrument auditioning
    const triggerInstrument = (index) => {
        instruments[index].instrument.triggerAttack('C3')
    }

    // Methods for editing instruments and parts

    // If set to > -1 where in editSampleMode and the value represents which instrument is being edited
    const [editSampleModeValue, setEditSampleModeValue] = useState(-1)

    const selectInstrumentSample = (checksum) => {
        instruments[editSampleModeValue].loaded = false
        instruments[editSampleModeValue].instrument.add('C3', `samples/${checksum}`)
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

    const updateInstrumentName = (index, name) => {
        instruments[index].name = name
        console.log(instruments[index].name)
    }

    return (
        <div className="container">
            <Transport
                playing={playing}
                toggleTransport={toggleTransport}
                updateBpm={updateBpm}
                getBpm={bpm}
                updateSwing={updateSwing}
                getSwing={swing}
                position={position}
            />
            <div className="split-pane">
                <div className="sample-browser-section">
                    <SampleBrowser
                        auditSample={auditSample}
                        setAuditionVol={setAuditionVol}
                        selectInstrumentSample={selectInstrumentSample}
                        editSampleModeValue={editSampleModeValue}
                    />
                </div>
                <div className="instrument-section">
                    {
                        instruments.map((instrument, index) => {
                            return <Instrument
                                key={instrument.key}
                                index={index}
                                name={instrument.name}
                                addNote={addNote}
                                removeNote={removeNote}
                                updateInstrumentName={updateInstrumentName}
                                activeStep={activeStep}
                                editSampleModeValue={editSampleModeValue}
                                setEditSampleModeValue={setEditSampleModeValue}
                                triggerInstrument={triggerInstrument}
                                deleteInstrument={deleteInstrument}
                            />
                        })
                    }
                    <div className="plus">
                        <FontAwesomeIcon
                            className="plus-icon"
                            icon={faPlus}
                            onClick={() => addNewInstrument()}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workstation