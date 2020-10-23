import React, { Component } from "react"
import PropTypes from "prop-types"

export default class ArticleDate extends Component {
  static propTypes = {
    date: PropTypes.string,
    timeToRead: PropTypes.number,
  }
  render() {
    return (
      <p style={{ marginTop: 0 }}>
        {this.props.date} - <TimeToRead timeToRead={this.props.timeToRead} />
      </p>
    )
  }
}

class TimeToRead extends Component {
  static propTypes = { timeToRead: PropTypes.number }
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
