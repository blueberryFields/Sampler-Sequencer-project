import React, {useState, useEffect, useRef} from 'react'
import Tone from 'tone'
import Transport from "./Transport";
import Instrument from "./Instrument";
import SampleBrowser from "./SampleBrowser";
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Workstation = props => {

    const [position, setPosition] = useState(Tone.Transport.position)

    const [playing, setPlaying] = useState(false)

    const [timerId, setTimerId] = useState(null)

    const togglePositionUpdater = () => {
        if (!playing) {
            setTimerId(setInterval(() => {
                setPosition(formatPosition(Tone.Transport.position))
            }, 0))
        } else {
            // noinspection JSCheckFunctionSignatures
            clearInterval(timerId)
            setPosition(formatPosition(Tone.Transport.position))
        }
    }

    const formatPosition = (position) => {
        return position.split(":")[0] + ':' + position.split(":")[1] + ':' + parseFloat(position.split(":")[2]).toFixed(0)
    }

    useEffect(() => {
        /*if(playing) {
            setActiveStep(position.split(":")[1] * position.split(":")[2])
        }*/
        // console.log('position updated:', activeStep, parseInt(position.split(":")[1]) +1, parseInt(position.split(":")[2]))
    }, [position])

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
        if (playing) setActiveStep(-1)
        Tone.Transport.toggle()
        setPlaying(!playing)
        togglePositionUpdater()
    }



    const [activeStep, setActiveStep] = useState(-1)

    const stepForward = () => {
        stepperRef.current < 15 ? setActiveStep(stepperRef.current + 1) : setActiveStep(0)
        console.log('Step forward fired', activeStep)
    }

    const initStepper = (() => {
        Tone.Transport.scheduleRepeat(stepForward, '16n')
    })

    const stepperRef = useRef(activeStep)

    useEffect(
        () => { stepperRef.current = activeStep },
        [activeStep]
    )

    useEffect(() => {
        initStepper()
    }, [])

    // SOUND-ENGINE

    const [instruments, setInstruments] = useState([])

    // Runs only once, when component is mounted.
    // Initializes the instruments

    useEffect(() => {
        let instrument1 = new Tone.Sampler({
            'C3': 'samples/kick.wav',
        }).toMaster()

        // pass in an array of events
        let part1 = new Tone.Part(function (time, event) {
            //the events will be given to the callback with the time they occur
            instrument1.triggerAttack(event.note, time)
        }, [])

        //start the part at the beginning of the Transport's timeline
        part1.start(0)
        part1.loop = true
        part1.loopEnd = '1n'

        let instrument2 = new Tone.Sampler({
            'C3': 'samples/hihat.wav',
        }).toMaster()


        // pass in an array of events
        let part2 = new Tone.Part(function (time, event) {
            //the events will be given to the callback with the time they occur
            instrument2.triggerAttack(event.note, time)
        }, [])

        //start the part at the beginning of the Transport's timeline
        part2.start(0)
        part2.loop = true
        part2.loopEnd = '1n'

        setInstruments([
            {
                name: 'Instr 1',
                instrument: instrument1,
                part: part1
            },
            {
                name: 'Instr 2',
                instrument: instrument2,
                part: part2
            }
        ])

    }, [])

    // Methods for editing instruments and parts

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

    const addNewInstrument = () => {
        let instrument = new Tone.Sampler({
            'C3': 'samples/snare.wav',
        }).toMaster()

        // pass in an array of events
        let part = new Tone.Part(function (time, event) {
            //the events will be given to the callback with the time they occur
            instrument.triggerAttack(event.note, time)
        }, [])

        //start the part at the beginning of the Transport's timeline
        part.start(0)
        part.loop = true
        part.loopEnd = '1n'

        setInstruments([
            ...instruments,
            {
                name: 'Instr ' + (instruments.length + 1),
                instrument: instrument,
                part: part
            }
        ])
    }

    return (
        <div className="container">
            <Transport
                playing={playing}
                toggleTransport={toggleTransport}
                updateBpm={updateBpm}
                getBpm={bpm}
                updateSwing={updateSwing}
                getSwing={Tone.Transport.swing}
                position={position}
            />
            <div className="split-pane">
                <div className="sample-browser-container">
                    <SampleBrowser/>
                </div>
                <div className="instrument-section">
                    {
                        instruments.map((instrument, index) => {
                            return <Instrument
                                key={index}
                                index={index}
                                name={instrument.name}
                                addNote={addNote}
                                removeNote={removeNote}
                                updateInstrumentName={updateInstrumentName}
                                activeStep={activeStep}
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
                    <button
                        style={{width: '4rem', height: '2rem', background: 'grey'}}
                        // onClick={() => stepForward()}
                    >
                        {activeStep}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Workstation