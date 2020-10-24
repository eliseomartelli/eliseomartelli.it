import React from "react"
import { graphql } from "gatsby"

import App from "../components/App"
import ArticleDate from "../components/ArticleDate"
import { ArticleTitle } from "../components/ArticleTitle"
import Seo from "../components/Seo"

export default function PostTemplate({ data }) {
  const { markdownRemark } = data
  const { html, timeToRead, excerpt } = markdownRemark
  const { date } = markdownRemark.fields
  const { title } = markdownRemark.frontmatter
  return (
    <App>
      <Seo title={title} description={excerpt} />
      <article>
        <ArticleTitle>{title}</ArticleTitle>
        <ArticleDate date={date} timeToRead={timeToRead} />
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </App>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
      }
      fields {
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
