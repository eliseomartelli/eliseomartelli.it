import React, { Component } from "react"

import ThemeContext from "../context/ThemeContext"

export default class DarkModeToggle extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <button onClick={theme.toggleDarkTheme}>
            {theme.darkTheme ? "Light" : "Dark"}
          </button>
        )}
      </ThemeContext.Consumer>
    )
  }
}
