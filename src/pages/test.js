import React, { Component } from 'react'

import styled, {ThemeProvider, createGlobalStyle} from "styled-components"

import ThemeContext from "../context/ThemeContext"

import DarkModeToggle from "../components/DarkModeToggle"


const GlobalStyle = createGlobalStyle`
    body {
        background: ${props => props.theme.background};
        color: ${props => props.theme.text};
    }
    h2 {
        color: ${props => props.theme.primary};
    }
    .sec {
        background: ${props => props.theme.secondaryBackground};
        padding: 16px;
    }
    a {
        color: ${props => props.theme.secondary}
    }
`;


export default class Test extends Component {
    render() {
        return (
            <ThemeContext.Consumer>
                {theme => (
                    <ThemeProvider theme={theme.darkTheme ? themes.dark : themes.light} style={{padding: 16}}>
                        <GlobalStyle />
                        <DarkModeToggle />
                        {console.log(theme)}
                        <h2>Hey,</h2>
                        <p>
                            You make me feel better.
                        </p>
                        <div className="sec">Some secondaryBackground</div>
                        <a>HEEEEEY, I'm a link.</a>
                    </ThemeProvider>
                )}
            </ThemeContext.Consumer>
        )
    }
}

const themes = {
    dark: {
        primary: '#FF384D',
        secondary: '#EB001A',
        text: '#FFFFFF',
        background: '#2B242C',
        secondaryBackground: '#221C24',        
    },
    light: {
        primary: '#457B85',
        secondary: '#13a89c',
        text: '#000000',
        background: '#FFFFFF',
        secondaryBackground: '#FAFAFA',
    }
}