import { Link } from "gatsby"
import React from "react"

import DarkModeToggle from "./DarkModeToggle"

import { Content } from "./Content"

import styled, {createGlobalStyle} from "styled-components";


const HeaderC = styled.header`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background: ${props => props.theme.background};
`;

const HeaderStyle = createGlobalStyle`
  header h2 {
    transition: font-size .125s ease-in-out;
  }
  header.shrink h2 {
    font-size: 1em;
  }
`;

export default class Header extends React.Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  handleScroll() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop
    const shrinkOn = 30
    const headerEl = document.getElementsByTagName("header")[0]

    if (distanceY > shrinkOn) {
      headerEl.classList.add("shrink")
      headerEl.classList.add("shadow")
    } else {
      headerEl.classList.remove("shrink")
      headerEl.classList.remove("shadow")
    }
  }

  render() {
    return (
      <HeaderC>
        <HeaderStyle />
        <Content
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px 0",
          }}
        >
          <h2 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                textDecoration: `none`,
                color: "inherit",
              }}
            >
              {this.props.siteTitle}
            </Link>
          </h2>
          <DarkModeToggle />
        </Content>
      </HeaderC>
    )
  }
}
