import React, { Component } from "react"
import ThemeContext from "../context/ThemeContext"

import { scale } from "../utils/typography"

export default class DarkModeToggle extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {data => (
          <button
            style={{
              lineHeight: "2rem",
              background: "none",
              border: "none",
              marginRight: 16,
            }}
            onClick={data.toggleDarkTheme}
          >
            {data.darkTheme ? "☀️" : "🌙"}
          </button>
        )}
      </ThemeContext.Consumer>
    )
  }
}
