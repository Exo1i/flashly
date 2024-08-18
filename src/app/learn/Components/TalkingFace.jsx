import React, {forwardRef, useImperativeHandle, useState} from 'react';
import './styles.css';

const TalkingFace = forwardRef(function TalkingFace({status}, ref) {
    const [st, setSt] = useState(status || 'neutral');

    useImperativeHandle(ref, () => ({
        changeStatus: (newStatus) => {
            setSt(newStatus);
        }
    }));

    return (
        <div id="container">
            <div id="bot" className={st}>
                <div id="head">
                    <div id="left-ear">
                        <div id="left-ear-inner"></div>
                    </div>
                    <div id="face">
                        <div id="eyes">
                            <div id="left-eye"></div>
                            <div id="right-eye"></div>
                        </div>
                        <div id="mouth"></div>
                    </div>
                    <div id="right-ear">
                        <div id="right-ear-inner"></div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default TalkingFace;
