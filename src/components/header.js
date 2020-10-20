import { Link } from "gatsby"
import React from "react"


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
        }}>
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 600,
            display: 'flex',
            flexBasis: '0',
            alignItems: 'center',
            padding: '1.45rem 16px'
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
        </div>
      </header>
    )
  }
}
