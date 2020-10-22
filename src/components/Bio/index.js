import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import style from "./Bio.module.css"

import styled from "styled-components"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.com/docs/use-static-query/
 */

const Card = styled.div`
  border-radius: 4px;
  background: ${props => props.theme.secondaryBackground};
  padding: 16px;
`

const Bio = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "avatar.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 128) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Card
      style={{
        display: "flex",
        margin: "2.5rem 0",
        padding: "16px 0",
        justifyContent: "center",
      }}
    >
      <Img
        fluid={data.placeholderImage.childImageSharp.fluid}
        style={{
          boxSizing: "border-box",
          minWidth: 64,
          minHeight: 64,
          borderRadius: "50%",
          marginRight: 16,
        }}
      />
      <p>
        I'm{" "}
        <a
          href="twitter.com/eliseomartelli"
          rel="noopener"
          target="_blank"
          style={{ color: "inherit" }}
        >
          <b>Eliseo</b>
        </a>
        , a CS student in Italy.
        <br></br>Join my journey through networks and computers.
      </p>
    </Card>
  )
}

export default Bio
