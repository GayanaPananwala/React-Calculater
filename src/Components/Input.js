import React from "react";

export default function Input(props) {

    return (
       <div className="input--container">
            <div className="question">
                <h3>{props.question}</h3>
            </div>
            <div className="text" >
                {props.text ? <h2>{props.text}</h2> : <h2>0</h2>}
            </div>
        </div>
    )
}