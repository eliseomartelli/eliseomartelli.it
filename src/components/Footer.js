import React, { Component } from "react"
import { rhythm } from "../utils/typography"
export default class Footer extends Component {
  render() {
    return (
      <footer style={{ marginTop: rhythm(2), marginBottom: rhythm(1) }}>
        © {new Date().getFullYear()}, Eliseo Martelli
      </footer>
    )
  }
}
