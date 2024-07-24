//All the states are removed and created the new state over here and setInterval clearInterval is used ..
//dialog box is opened when we stop the timer.
//sharing state across components

import React, { useRef, useState } from 'react';
import ResultModel from './ResultModel.jsx';

export default function TimerChallenge({ title, targetTime }) {
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);


    const timer = useRef();
    const dialog = useRef();

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        // setTimeRemaining(targetTime * 1000);
        dialog.current.open();
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);

        }, 10);
    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);
    }
    function handleReset() {
        setTimeRemaining(targetTime * 1000)
    }

    const timeIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    return (
        <>
            <ResultModel ref={dialog} targetTime={targetTime}
                result='lost' remainingTime={timeRemaining}
                onReset={handleReset} />
            <section className='challenge'>
                <h2>{title}</h2>

                <p className='challenge-time'>
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timeIsActive ? handleStop : handleStart}>
                        {timeIsActive ? 'stop' : 'start'} Challenge
                    </button>
                </p>
                <p className={timeIsActive ? 'active' : undefined}>
                    {timeIsActive ? 'Time is Running...' : 'Timer inactive'};
                </p>
            </section>
        </>
    )
}
