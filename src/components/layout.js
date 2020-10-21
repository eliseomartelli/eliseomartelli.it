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

import {Content} from "./Content"

import ThemeContext from "../context/ThemeContext"

import {ThemeProvider, createGlobalStyle} from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    background: ${props => props.theme.background};
    color: ${props => props.theme.text}
  }
`;

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
        <ThemeProvider
          theme={theme.darkTheme ? themes.dark : themes.light}>
            <GlobalStyle /> 
            <Header siteTitle={data.site.siteMetadata?.title} />
            <Content>
              <main
                style={
                  {
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    marginTop: '96px'
                  }
                }>
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