import React from "react";

export default function Button(props) {
    const styles = {
        backgroundColor: props.color,
        color: props.txtColor

    }
    return (
        <input onClick={() => props.handleClick(props.label)} className="button--wrapper" style = {styles} type="button" value={props.label} />
    )
}