import React, {useState, useEffect} from 'react'
import Tone from 'tone'
import Transport from "./Transport";

const SoundEngine = props => {

    const [position, setPosition] = useState(Tone.Transport.position)

    const positionUpdater = () => {
        setInterval(() => {
            setPosition(formatPosition(Tone.Transport.position))
        }, 100)
    }

    const formatPosition = (position) => {
        return position.split(":")[0] + ':' + position.split(":")[1] + ':' + parseFloat(position.split(":")[2]).toFixed(0)
    }

    const updateBpm = (bpm) => {
        Tone.Transport.bpm.value = bpm
        console.log(Tone.Transport.bpm.value)
    }

    const updateSwing = (swing) => {
        Tone.Transport.swing = swing
        console.log(Tone.Transport.swing)
    }

    const toggleTransport = () => {
        Tone.Transport.toggle()
        positionUpdater()
    }

    return (
        <div>
            <Transport
                currentTime={Tone.Transport.seconds.toFixed(2)}
                toggleTransport={toggleTransport}
                updateBpm={updateBpm}
                getBpm={Tone.Transport.bpm.value}
                updateSwing={updateSwing}
                getSwing={Tone.Transport.swing}
                position={position}
            />
        </div>
    )
}

export default SoundEngine