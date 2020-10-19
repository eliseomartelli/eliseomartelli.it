import React from 'react'
import PropTypes from 'prop-types'

function Time(props) {
    const timeUnit = (props.time === 1) ? "minute" : "minutes";
    return (
        <>
            🕒 <i>{props.time} {timeUnit} read</i>
        </>
    )
}

Time.propTypes = {
    time: PropTypes.number
}

export default Time;
