import React, { Component } from "react"
import PropTypes from "prop-types"

export default class Content extends Component {
  render() {
    return (
      <div style={{ margin: "0 auto", maxWidth: 600, padding: "0 16px" }}>
        {this.props.children}
      </div>
    )
  }
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
}
