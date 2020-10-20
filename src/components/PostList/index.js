import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PostEntry from "../PostEntry"

export default class PostList extends Component {
    static propTypes = {
        posts: PropTypes.arrayOf(PropTypes.object)
    }

    render() {
        return (
            <>{this.props.posts.map(post => (<PostEntry key={post.slug} {...post} />))}</>
        )
    }
}
