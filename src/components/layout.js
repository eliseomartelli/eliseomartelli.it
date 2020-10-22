/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"

import { Content } from "./Content"

import ThemeContext from "../context/ThemeContext"

import { ThemeProvider, createGlobalStyle } from "styled-components"

import { Themes } from "../Themes"

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    transition: all 0.5s ease-in-out;
  }

  a {
    color: ${props => props.theme.secondary};
  }

  .shadow {
    box-shadow: 0 0px 12px rgba(0,0,0,.2);
  }
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeContext.Consumer>
      {theme => (
        <ThemeProvider theme={theme.darkTheme ? Themes.dark : Themes.light}>
          <GlobalStyle />
          <Header siteTitle={data.site.siteMetadata?.title} />
          <Content>
            <main
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                marginTop: "96px",
              }}
            >
              {children}
              <Footer />
            </main>
          </Content>
        </ThemeProvider>
      )}
    </ThemeContext.Consumer>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
