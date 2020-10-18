/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require(`gatsby-source-filesystem`);
const { extractMetadataFromFilename, isBlogPostFileName } = require("./src/util");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const { categories } = node.frontmatter;
    const filePath = createFilePath({ node, getNode, basePath: `pages` });
    
    let date, slug;
    if(isBlogPostFileName(filePath)) {
      const result  = extractMetadataFromFilename(filePath);
      date = result.date;
      slug = node.frontmatter.permalink || result.slug;
      createNodeField({ node, name: `date`, value: date });
    } else {
      slug = filePath.substring(1);
    }
    console.log(filePath, isBlogPostFileName(filePath), slug, date);
    createNodeField({ node, name: `slug`, value: slug  });
  }
};