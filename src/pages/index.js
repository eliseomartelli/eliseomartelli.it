import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Article from "../components/article"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Article articleName="Test Article" articleDate="Sep 12, 2020" articleExcerpt="lorem ipsum dolor sit amet" />
    <Article articleName="Lorem Ipsum? Dolor sit amet." articleDate="Sep 12, 2020" articleExcerpt="lorem ipsum dolor sit amet" />
  </Layout>
)

export default IndexPage
