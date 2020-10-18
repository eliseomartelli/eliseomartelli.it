import { Link, Img } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"


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
        }}>
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 600,
            padding: '1.45rem 16px'
          }}>
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                textDecoration: `none`,
                color: 'black'
              }}>
                {this.props.siteTitle}
            </Link>
          </h1>
        </div>
      </header>
    )
  }
}
