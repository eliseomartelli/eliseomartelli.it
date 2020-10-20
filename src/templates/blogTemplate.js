import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TimeToRead from "../components/PostEntry/TimeToRead"
import '../components/blogPost.css'

import { DiscussionEmbed } from 'disqus-react';

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
        <h1 style={{ marginBottom: 0}}>{title}</h1>
        <p style={{marginTop: 0, fontSize: '0.75rem'}}>{date} - <TimeToRead timeToRead={timeToRead} /></p>
      </div>
      <div 
        style={{
          marginTop: 16,
          marginBottom: 16
        }}
        dangerouslySetInnerHTML={{__html: html}}></div>
      <DiscussionEmbed />
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