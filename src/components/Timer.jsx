import React from 'react';
import Countdown from 'react-countdown';



export function Timer(){
    const Completionist = () => <span>Times Up</span>;

    const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return (
        <div>
            <Completionist />
            {window.location.reload()}
        </div>
        
        )
    } else {
        // Render a countdown
        return <span>{hours}:{minutes}:{seconds}</span>;
    }
    };
    
    return (
        <div>
            <Countdown date={Date.now() + 60000}
            renderer={renderer}
            >
                <Completionist />
            </Countdown>
        </div>
    )
}