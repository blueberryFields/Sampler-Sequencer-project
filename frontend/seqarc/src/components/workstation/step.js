import React, {} from 'react'
import './Workstation.css'

const Step = props => {
    return (
        <div className={props.id === 1 || props.id === 5 || props.id === 9 || props.id === 13 ? 'step on-beat' : 'step' }
                onClick={() => props.toggleStepOn(props.id)}>
            <div className={props.on ? 'led-on' : 'led-off'}/>
        </div>
    )
}

export default Step

