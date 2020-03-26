import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const ContentContainer = ({ style, children, title }) => {
  const data = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "just_jesus.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 4000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "20rem",
      }}
    >
      <BackgroundImage
        backgroundColor={`#040e18`}
        style={{
          height: "50vh",
          marginBottom: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
        fluid={data.image.childImageSharp.fluid}
      >
        {title}
      </BackgroundImage>
      {children}
    </div>
  )
}

export default ContentContainer
