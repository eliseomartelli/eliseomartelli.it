import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { ArticleTitle } from "./ArticleTitle"
import ArticleDate from "./ArticleDate"

export default class PostEntry extends Component {
  static propTypes = {
    title: PropTypes.string,
    timeToRead: PropTypes.number,
    slug: PropTypes.string,
    excerpt: PropTypes.string,
    date: PropTypes.string,
  }

  render() {
    return (
      <Link
        to={this.props.slug}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <article>
          <ArticleTitle>{this.props.title}</ArticleTitle>
          <ArticleDate {...this.props} />
          <p>{this.props.excerpt}</p>
        </article>
      </Link>
    )
  }
}
