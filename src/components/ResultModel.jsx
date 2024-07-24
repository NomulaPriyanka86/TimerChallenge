//added portal to execute the dialog box in the modal div. getrid of getting all the dialogs in the resultModal
//it has two parameters in the function jsx and document.gEBI('modal')
import React, { useImperativeHandle, useRef } from 'react';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';


const ResultModel = forwardRef(function ResultModel({ targetTime, remainingTime, onReset },
    ref) {
    const dialog = useRef(); {/*const dialogF = useRef(); */ }

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal(); {/*  dialogF.current.showModal(); */ }
            }
        }
    })

    return createPortal(
        // <dialog ref={dialogF} className='result-modal'>    {/* dialogF is used for ref*/}
        <dialog ref={dialog} className='result-modal'>
            {userLost && <h2>Your Lost</h2>}
            {!userLost && <h2>Your Score : {score}</h2>}
            <p>The Target Time was <strong>{targetTime}  seconds...</strong> </p>
            <p>You stopped the timer with {' '}<strong>{formattedRemainingTime} seconds left...</strong></p>
            <form method='dialog' onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
})
export default ResultModel;