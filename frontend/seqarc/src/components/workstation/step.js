import React, {} from 'react'
import './Workstation.css'

const Step = props => {
    return (
        <div className={props.id === 0 || props.id === 4 || props.id === 8 || props.id === 12 ? 'step on-beat' : 'step' }
                onClick={() => props.toggleStepOn(props.id)}>
            <div className={props.on ? 'led-on' : 'led-off'}/>
        </div>
    )
}

export default Step

