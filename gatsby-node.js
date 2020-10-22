/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require(`gatsby-source-filesystem`)
const {
  extractMetadataFromFilename,
  isBlogPostFileName,
} = require("./src/util")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const filePath = createFilePath({ node, getNode, basePath: `pages` })

    let date, slug, categories

    if (isBlogPostFileName(filePath)) {
      let metadata = extractMetadataFromFilename(filePath)
      date = metadata.date
      categories = node.frontmatter.categories.split(" ").join("/") || ""
      slug = `${categories}/${metadata.slug}`
      createNodeField({ node, name: "date", value: date })
    } else {
      slug = filePath.substring(1)
    }
    createNodeField({ node, name: "slug", value: slug })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [fields___date] }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
