import React from 'react';
import "./styles.css"

const TalkingFace = ({status}) => {

    return (
        <div id="container">
            <div id="bot" className={`neutral ${status}`}>
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
    )
        ;
};

export default TalkingFace;
