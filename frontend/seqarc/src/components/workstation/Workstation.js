import React, {useState, useEffect} from 'react'
import Tone from 'tone'
import Transport from "./Transport";
import Instrument from "./Instrument";
import SampleBrowser from "./SampleBrowser";

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
                    <Instrument
                        number={1}/>
                </div>
            </div>
        </div>
    )
}

export default Workstation