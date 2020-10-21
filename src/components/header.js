import { Link } from "gatsby"
import React from "react"

import DarkModeToggle from "./DarkModeToggle"


import {Content} from "./Content"

export default class Header extends React.Component {
 
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  handleScroll() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop;
    const shrinkOn = 10;
    const headerEl = document.getElementById("header");

    if (distanceY > shrinkOn) {
      headerEl.classList.add("shrink");
      headerEl.classList.add("shadow");
    } else {
      headerEl.classList.remove("shrink");
      headerEl.classList.remove("shadow");
    }
  }

  render() {
   return (
      <header
        id="header"
        style={{
          marginBottom: `1rem`,
          zIndex: 999,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          background: 'purple'
        }}>
        <Content
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '16px 0'
          }}>
          <h2 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                textDecoration: `none`,
                color: 'inherit'
              }}>
                {this.props.siteTitle}
            </Link>
          </h2>
          <DarkModeToggle />
        </Content>
      </header>
    )
  }
}
