import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from "gatsby"

import TimeToRead from "./TimeToRead"

import style from "./PostEntry.module.css"

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
            <Link
                className={style.link} 
                to={this.props.slug}>
                <h2 className={style.title}>{this.props.title}</h2>
                <p className={style.date}>
                    {this.props.date} - {" "}
                    <TimeToRead timeToRead={this.props.timeToRead} />
                </p>
                <p>{this.props.excerpt}</p>
            </Link>
        )
    }
}