import React, {useState, useEffect} from 'react'
import Tone from 'tone'
import Transport from "./Transport";

const SoundEngine = props => {

    const toggleTransport = () => {
        Tone.Transport.toggle()
    }

    return (
        <div>
            <Transport
                currentTime={Tone.Transport.seconds.toFixed(2)}
                toggleTransport={toggleTransport}
            />
        </div>
    )
}

export default SoundEngine