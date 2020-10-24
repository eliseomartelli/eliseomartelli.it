import React, { Component } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { ThemeProvider } from "styled-components"
import ThemeContext from "../context/ThemeContext"

import { Themes } from "../Themes"

import Content from "./Content"
import Footer from "./Footer"
import Header from "./Header"
import { GlobalStyle } from "./GlobalStyle"
import { rhythm } from "../utils/typography"

export default class App extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <ThemeProvider theme={theme.darkTheme ? Themes.dark : Themes.light}>
            <GlobalStyle />
            <StaticQuery
              query={graphql`
                query HeaderQuery {
                  site {
                    siteMetadata {
                      title
                    }
                  }
                }
              `}
              render={data => (
                <Header siteTitle={data.site.siteMetadata?.title} />
              )}
            />
            <Content>
              <main
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                  marginTop: rhythm(3),
                }}
              >
                {this.props.children}
              </main>
              <Footer />
            </Content>
          </ThemeProvider>
        )}
      </ThemeContext.Consumer>
    )
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
}
