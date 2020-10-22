import React, { Component } from "react"

export default class Footer extends Component {
  render() {
    return <footer>© {new Date().getFullYear()}, Eliseo Martelli</footer>
  }
}
