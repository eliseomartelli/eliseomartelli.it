import React from "react"

import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Article from "../components/article"
import Bio from "../components/bio"

const IndexPage = ({
    data: {
      allMarkdownRemark: { edges },
    },
  }) => {
    return (
      <Layout>
        <SEO title="Home" />
        <Bio/>
        {
          edges.map(edge => (
            <Article 
              articleName={edge.node.frontmatter.title}
              articleExcerpt={edge.node.excerpt}
              articleDate={edge.node.fields.date}
              articleTime={edge.node.timeToRead}
              articleSlug={edge.node.fields.slug}/>
          ))
        }
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
            date
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
