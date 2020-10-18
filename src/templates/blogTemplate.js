import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function Template({
  data
}) {
  const { markdownRemark } = data;
  const { html } = markdownRemark;
  const { date } = markdownRemark.fields;
  const { title } = markdownRemark.frontmatter;
  return (
    <Layout>
      <div>
        <h1>{title}</h1>
        <p>{date}</p>
      </div>
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