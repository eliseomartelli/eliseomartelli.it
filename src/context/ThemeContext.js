import React, { Component } from "react"

const defaultState = {
  darkTheme: false,
  toggleDarkTheme: () => {},
}

const ThemeContext = React.createContext(defaultState)

export class ThemeProvider extends Component {
  state = {
    darkTheme: false,
  }

  isSystemDarkMode() {
    return window.matchMedia("(prefers-color-scheme: dark)")
  }

  toggleDarkTheme = () => {
    let newState = !this.state.darkTheme
    localStorage.setItem("darkTheme", JSON.stringify(newState))
    this.setState({ darkTheme: newState })
  }

  componentDidMount() {
    const isDarkTheme = JSON.parse(localStorage.getItem("darkTheme"))
    if (isDarkTheme !== null) {
      this.setState({ darkTheme: isDarkTheme })
    } else if (this.isSystemDarkMode()) {
      this.setState({ darkTheme: true })
    }
  }

  render() {
    return (
      <ThemeContext.Provider
        value={{
          darkTheme: this.state.darkTheme,
          toggleDarkTheme: this.toggleDarkTheme,
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeContext
