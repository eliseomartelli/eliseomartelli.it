import React, { Component } from "react"
import ThemeContext from "../context/ThemeContext"

export default class DarkModeToggle extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {data => (
          <button onClick={data.toggleDarkTheme}>
            {data.darkTheme ? "Light" : "Dark"}
          </button>
        )}
      </ThemeContext.Consumer>
    )
  }
}
