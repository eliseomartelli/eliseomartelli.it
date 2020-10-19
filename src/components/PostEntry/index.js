import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from "gatsby"

import TimeToRead from "./TimeToRead"

export default class PostEntry extends Component {
    static propTypes = {
        title: PropTypes.string,
        date: PropTypes.string,
        timeToRead: PropTypes.number,
        slug: PropTypes.string,
        excerpt: PropTypes.string,
    }

    render() {
        const titleStyle = {
            color: '#FF384E',
            paddingBottom: 0,
            marginBottom: 0,
        }
        const dateStyle = {
            marginTop: 0,
            fontSize: '0.75rem'
        }
        const linkStyle = {
            textDecoration: 'none',
            color: 'inherit',
            marginBottom: 16
        }
        return (
            <Link
                style={linkStyle} 
                to={this.props.slug}>
                <h2 style={titleStyle}>{this.props.title}</h2>
                <p style={dateStyle}>
                    {this.props.date} - {" "}
                    <TimeToRead timeToRead={this.props.timeToRead} />
                </p>
                <p>{this.props.excerpt}</p>
            </Link>
        )
    }
}