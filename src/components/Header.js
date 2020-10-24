import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"

import { rhythm } from "../utils/typography"

import Content from "./Content"
import DarkModeToggle from "./DarkModeToggle"

const Toolbar = styled.header`
  background: ${props => props.theme.background};
`

export default class Header extends Component {
  state = {
    marginTop: rhythm(2),
    marginBottom: rhythm(1),
    boxShadow: "",
  }

  onScrollEvent = e => {
    if (window.scrollY > 32) {
      this.setState({
        marginTop: rhythm(2 / 3),
        marginBottom: rhythm(1 / 2),
        boxShadow: "0 0 12px 0 rgba(0,0,0,.2)",
      })
    } else {
      this.setState({
        marginTop: rhythm(2),
        marginBottom: rhythm(1),
        boxShadow: "",
      })
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScrollEvent)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScrollEvent)
  }

  static propTypes = {
    siteTitle: PropTypes.string,
  }

  render() {
    return (
      <Toolbar
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 999,
          paddingTop: `${this.state.marginTop}`,
          paddingBottom: `${this.state.marginBottom}`,
          boxShadow: `${this.state.boxShadow}`,
          transition:
            "inherit, padding 0.125s ease-in-out, box-shadow 0.125s ease-in-out",
        }}
      >
        <Content>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link
              style={{ textDecoration: "none", display: "inline-block" }}
              to="/"
            >
              <Logo>{this.props.siteTitle}</Logo>
            </Link>
            <DarkModeToggle />
          </div>
        </Content>
      </Toolbar>
    )
  }
}

const Logo = styled.h2`
  color: ${props => props.theme.text};
  margin: 0;
`
