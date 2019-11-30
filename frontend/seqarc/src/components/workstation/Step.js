import React, {} from 'react'
import './Workstation.css'

const Step = props => {
    return (
        <div className={props.index === 0 || props.index === 4 || props.index === 8 || props.index === 12 ? 'step on-beat' : 'step' }
                onClick={() => props.toggleStepOn(props.index)}>
            <div className={props.ledStatus}/>
        </div>
    )
}

export default Step

