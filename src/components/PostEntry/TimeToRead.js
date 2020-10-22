import React, { Component } from "react"
import PropTypes from "prop-types"

export default class TimeToRead extends Component {
  static propTypes = {
    timeToRead: PropTypes.number,
  }

  getTimeUnit() {
    return this.props.timeToRead === 1 ? "minute" : "minutes"
  }

  render() {
    return (
      <>
        🕒{" "}
        <i>
          {this.props.timeToRead} {this.getTimeUnit()} read
        </i>
      </>
    )
  }
}
