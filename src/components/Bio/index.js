import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import style from "./Bio.module.css"

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
      <div 
        className={`card ${style.bio}`}>
        <Img 
            fluid={data.placeholderImage.childImageSharp.fluid}
            className={style.profilePic}/>
        <p>
            I'm <a href="twitter.com/eliseomartelli" rel="noopener" target="_blank" style={{color: 'inherit'}}>
                        <b>Eliseo</b>
            </a>, a CS student in Italy.
            <br></br>Join my journey through networks and computers.
        </p>
      </div>
  )
}

export default Bio