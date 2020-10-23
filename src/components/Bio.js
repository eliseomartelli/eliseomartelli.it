import React, { Component } from "react"
import styled from "styled-components"

import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import { rhythm } from "../utils/typography"

export default class Bio extends Component {
  render() {
    return (
      <BioContainer style={{ marginTop: rhythm(2) }}>
        <StaticQuery
          query={graphql`
            query {
              placeholderImage: file(relativePath: { eq: "avatar.jpg" }) {
                childImageSharp {
                  fluid(maxWidth: 128) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          `}
          render={data => (
            <Img
              style={{
                boxSizing: "border-box",
                minWidth: 64,
                minHeight: 64,
                borderRadius: "50%",
                marginRight: 16,
                alignSelf: "center",
              }}
              fluid={data.placeholderImage.childImageSharp.fluid}
            />
          )}
        />
        <p style={{ marginBottom: 0 }}>
          I'm{" "}
          <a
            style={{ color: "inherit", fontWeight: "bold" }}
            rel="noopener"
            target="__blank"
            href="https://twitter.com/eliseomartelli"
          >
            Eliseo
          </a>
          , a CS student in Italy.
          <br></br>Join my journey through networks and computers.
        </p>
      </BioContainer>
    )
  }
}

const BioContainer = styled.div`
  background: ${props => props.theme.secondaryBackground};
  padding: 16px;
  border-radius: 6px;
  display: flex;
`
