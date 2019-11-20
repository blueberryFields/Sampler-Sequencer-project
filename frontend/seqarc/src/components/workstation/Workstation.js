import React, {useState, useEffect} from 'react'
import Tone from 'tone'
import Transport from "./Transport";
import Instrument from "./Instrument";
import SampleBrowser from "./SampleBrowser";
import {faPlay, faPlus, faStop} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Workstation = props => {

    const [position, setPosition] = useState(Tone.Transport.position)

    const [playing, setPlaying] = useState(false)

    const [timerId, setTimerId] = useState(null)

    const togglePositionUpdater = () => {
        if (!playing) {
            setTimerId(setInterval(() => {
                setPosition(formatPosition(Tone.Transport.position))
            }, 100))
        } else {
            // noinspection JSCheckFunctionSignatures
            clearInterval(timerId)
            setPosition(formatPosition(Tone.Transport.position))
        }
    }

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
        setPlaying(!playing)
        togglePositionUpdater()
    }

    // SOUND-ENGINE

    const [instrument, setInstrument] = useState([])

    const addNote = (instrIndex, notePosition, noteValue) => {
        instrument[instrIndex].part.add(
            {time: {'16n': notePosition}, note: noteValue}
        )
    }

    const removeNote = (instrIndex, notePosition) => {
        instrument[instrIndex].part.remove(
            {'16n': notePosition}
        )
    }

    const updateInstrumentName = (index, name) => {
        instrument[index].name = name
        console.log(instrument[0].name)
    }

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

        setInstrument([
            ...instrument,
            {
                name: 'Instr 1',
                instrument: instrument1,
                part: part1
            }
        ])

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

        setInstrument([
            ...instrument,
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
                        instrument.map((instrument, index) => {
                            return <Instrument
                                key={index}
                                index={index}
                                name={instrument.name}
                                addNote={addNote}
                                removeNote={removeNote}
                                updateInstrumentName={updateInstrumentName}
                            />
                        })
                    }
                    <FontAwesomeIcon className="plus" icon={faPlus}/>
                </div>
            </div>
        </div>
    )
}

export default Workstation