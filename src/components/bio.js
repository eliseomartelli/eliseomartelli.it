import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Link from "gatsby-link"

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
      <div style={{
          display: 'flex',
          margin: '2.5rem 0',
          backgroundColor: "#FaFaFa",
          borderRadius: 4,
          padding: 16,
          justifyContent: 'center',
      }}>
        <Img 
            fluid={data.placeholderImage.childImageSharp.fluid}
            style={{
                boxSizing: 'border-box',
                minWidth: 64,
                minHeight: 64,
                borderRadius: "50%",
                marginRight: 16,
                alignSelf: 'center'
            }} />
        <p style={{}}>
            I'm <Link 
                    target="_blank" 
                    to="https://twitter.com/eliseomartelli"
                    style={{color: 'inherit'}}>
                        <b>Eliseo</b>
            </Link>, a CS student in Italy.
            <br></br>Join my journey through networks and computers.
        </p>
      </div>
  )
}

export default Bio