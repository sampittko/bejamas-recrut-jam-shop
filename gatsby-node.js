const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const productsQuery = await graphql(
    `
      {
        allFile(filter: { sourceInstanceName: { eq: "products" } }) {
          edges {
            node {
              childMarkdownRemark {
                frontmatter {
                  slug
                }
              }
            }
          }
        }
      }
    `
  )

  if (productsQuery.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const component = path.resolve(`src/templates/product.js`)

  const products = productsQuery.data.allFile.edges

  products.forEach((edge) => {
    const product = edge.node.childMarkdownRemark
    const { slug } = product.frontmatter

    createPage({
      path: slug,
      component,
      context: {
        slug,
      },
    })
  })
}
