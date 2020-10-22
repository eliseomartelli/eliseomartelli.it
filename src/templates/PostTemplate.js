import React from "react"
import { graphql } from "gatsby"

import App from "../components/App"
import ArticleDate from "../components/ArticleDate"
import { ArticleTitle } from "../components/ArticleTitle"

export default function PostTemplate({ data }) {
  const { markdownRemark } = data
  const { html, timeToRead, excerpt } = markdownRemark
  const { date } = markdownRemark.fields
  const { title } = markdownRemark.frontmatter
  return (
    <App>
      <article>
        <ArticleTitle>{title}</ArticleTitle>
        <ArticleDate date={date} timeToRead={timeToRead} />
        {/* <ArticleDate date={date} timeToRead={timeToRead} /> */}
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
