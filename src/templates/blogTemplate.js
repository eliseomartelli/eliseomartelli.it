import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function Template({
  data
}) {
  const { markdownRemark } = data;
  const { html } = markdownRemark;
  const { date } = markdownRemark.fields.date;
  const { title } = markdownRemark.frontmatter.title;
  return (
    <Layout>
      <h1>{title}</h1>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{__html: html}}></div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;