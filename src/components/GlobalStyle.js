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
    .gatsby-highlight {
        margin: auto -16px;
    }
    .gatsby-highlight pre {
        border-radius: 6px;
    }
    @media screen and (max-width: 600px) {
        .gatsby-highlight pre {
            border-radius: 0;
        }
    }

`
