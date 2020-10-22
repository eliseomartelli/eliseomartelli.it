import React, { Component } from "react"

export default class Footer extends Component {
  render() {
    const footerStyle = {
      padding: "16px 0",
    }
    return (
      <footer style={footerStyle}>
        © {new Date().getFullYear()}, Eliseo Martelli
      </footer>
    )
  }
}
