import React, { Component } from "react"

import { StaticQuery, graphql } from "gatsby"
import App from "../components/App"
import PostEntryList from "../components/PostEntryList"
import Bio from "../components/Bio"

export default class Index extends Component {
  render() {
    return (
      <App>
        <Bio />
        <StaticQuery
          query={graphql`
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [fields___date] }
              ) {
                edges {
                  node {
                    frontmatter {
                      title
                    }
                    timeToRead
                    excerpt
                    fields {
                      date(formatString: "MMMM D, YYYY")
                      slug
                    }
                  }
                }
              }
            }
          `}
          render={data => {
            const posts = data.allMarkdownRemark.edges.map(edge => ({
              title: edge.node.frontmatter.title,
              excerpt: edge.node.excerpt,
              date: edge.node.fields.date,
              timeToRead: edge.node.timeToRead,
              slug: edge.node.fields.slug,
            }))
            return <PostEntryList posts={posts} />
          }}
        />
      </App>
    )
  }
}
