import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
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
