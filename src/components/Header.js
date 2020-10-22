import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"

import Content from "./Content"

const Toolbar = styled.header`
  background: ${props => props.theme.background};
`

export default class Header extends Component {
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
        }}
      >
        <Content>
          <Link to="/">
            <h2>{this.props.siteTitle}</h2>
          </Link>
        </Content>
      </Toolbar>
    )
  }
}
