import React from "react"

const defaultState = {
  darkTheme: false,
  toggleDarkTheme: () => {},
}

const ThemeContext = React.createContext(defaultState)

const isSystemDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches

class ThemeProvider extends React.Component {
  state = {
    darkTheme: false,
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
    } else if (isSystemDarkMode()) {
      this.setState({ darkTheme: true })
    }
  }

  render() {
    const { children } = this.props
    const { darkTheme } = this.state
    return (
      <ThemeContext.Provider
        value={{ darkTheme, toggleDarkTheme: this.toggleDarkTheme }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeContext
export { ThemeProvider }
