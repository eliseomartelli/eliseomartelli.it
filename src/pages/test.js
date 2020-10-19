import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Layout from "../components/layout"
// import PostEntry from "../components/PostEntry"
import PostList from "../components/PostList"

export default class Test extends Component {
    static propTypes = {
    }

    render() {
        return (
            <Layout>
                {/* <PostEntry
                    title="Hello, World!"
                    date="September 20, 2020"
                    timeToRead={12}
                    slug="/"
                    excerpt="Lorem ipsum dolor sit amet" /> */}
                <PostList posts={
                    [
                        {
                            title: "Hello",
                            date: "September 20, 2020",
                            timeToRead: 2,
                            slug: "/",
                            excerpt: "Hello world, how is it going?"
                        },
                        {
                            title: "World",
                            date: "September 20, 2020",
                            timeToRead: 2,
                            slug: "/",
                            excerpt: "Hello world, how is it going?"
                        }
                    ]}/>
            </Layout>
        )
    }
}
