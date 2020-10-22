import React, { Component } from "react"
import PropTypes from "prop-types"

import { Link } from "gatsby"

import TimeToRead from "./TimeToRead"

import styled from "styled-components"

const Title = styled.h1`
  color: ${props => props.theme.primary};
  padding-bottom: 0;
  margin-bottom: 0;
`

export default class PostEntry extends Component {
  static propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    timeToRead: PropTypes.number,
    slug: PropTypes.string,
    excerpt: PropTypes.string,
  }

  render() {
    return (
      <Link to={this.props.slug}
        style={{
          textDecoration: 'none',
          color: 'inherit',
          marginBottom: 16
        }}>
        <article>
          <Title>{this.props.title}</Title>
          <p style={{
            marginTop: 0,
            fontSize: '0.75rem'
          }}>
            {this.props.date} -{" "}
            <TimeToRead timeToRead={this.props.timeToRead} />
          </p>
          <p>{this.props.excerpt}</p>
        </article>
      </Link>
    )
  }
}
