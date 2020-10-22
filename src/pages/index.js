import React from "react"

import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Bio from "../components/Bio"
import PostList from "../components/PostList"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const posts = edges.map(edge => ({
    title: edge.node.frontmatter.title,
    excerpt: edge.node.excerpt,
    date: edge.node.fields.date,
    timeToRead: edge.node.timeToRead,
    slug: edge.node.fields.slug,
  }))
  return (
    <Layout>
      <SEO
        title="Home"
        description="I'm Eliseo, a CS student in Italy. Join my journey through networks and computers."
      />
      <Bio />
      <PostList posts={posts} />
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { order: DESC, fields: [fields___date] }) {
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
`

export default IndexPage
