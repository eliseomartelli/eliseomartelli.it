import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    :root {
        --primary: ${props => props.theme.primary};
        --secondary: ${props => props.theme.secondary};
        --text: ${props => props.theme.text};
        --background: ${props => props.theme.background};
        --secondaryBackground: ${props => props.theme.secondaryBackground};
        
    }
    body {
        margin: 0;
        background: ${props => props.theme.background};
        color: ${props => props.theme.text};
    }

    article img {
        display: block;
        max-width: 500px;
        width: 90%;
        margin: 0 auto;
    }
`
