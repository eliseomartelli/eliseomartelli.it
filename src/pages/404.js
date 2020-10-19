import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ghost from "../images/ghost.svg"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <img src={ghost} alt="Illustration of a Ghost" style={{width: 120}}/>
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
