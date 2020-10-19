import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TimeToRead from "../components/PostEntry/TimeToRead"
import '../components/blogPost.css'


export default function Template({
  data
}) {
  const { markdownRemark } = data;
  const { html, timeToRead } = markdownRemark;
  const { date } = markdownRemark.fields;
  const { title } = markdownRemark.frontmatter;
  return (
    <Layout>
      <SEO
        title={title} />
      <div>
        <h1>{title}</h1>
        <p>{date}</p>
        <TimeToRead timeToRead={timeToRead} />
      </div>
      <div dangerouslySetInnerHTML={{__html: html}}></div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
      }
      fields {
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;