import React, {useState, useEffect} from 'react'
import './Workstation.css'

const Instrument = props => {

    const [name, setName] = useState("Instr " + props.number)

    const updateName = () => {
        console.log(name)
    }

    return (
        <div className="instrument-container">
            <div className="instr-header">
                <div className="trigger-button">
                    <div className="instr-number">{props.number}</div>
                </div>
                <input
                    className="instr-name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            updateName()
                        }
                    }}
                    onBlur={() => updateName()}
                />

            </div>
        </div>
    )
}

export default Instrument