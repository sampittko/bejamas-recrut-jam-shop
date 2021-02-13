/** @jsx jsx */
import { useStaticQuery, graphql } from "gatsby"
import React, { useContext } from "react"
import { jsx } from "theme-ui"
import { ShoppingCartContext } from "../../../hooks/useShoppingCart"
import { Row, Col } from "../../Grid"
import Product from "./Product"

function HomepageProducts() {
  const data = useStaticQuery(query)
  const [{ items }] = useContext(ShoppingCartContext)

  const allProducts = data.products.edges
  const section = data.section.childMarkdownRemark.frontmatter

  return (
    <section sx={styles.products}>
      <Row>
        <Col>
          <h1 sx={styles.title}>{section.title}</h1>
          <p sx={styles.lead}>{section.lead}</p>
        </Col>
      </Row>
      <Row styles={styles.listWrapper}>
        <ul sx={styles.list}>
          {allProducts.map((edge) => {
            const product = edge.node.childMarkdownRemark.frontmatter
            const productInCart = items.some(
              (item) => item.slug === product.slug
            )

            return (
              <Product
                key={product.slug}
                isInCart={productInCart}
                product={product}
              />
            )
          })}
        </ul>
      </Row>
    </section>
  )
}

const query = graphql`
  query {
    products: allFile(filter: { sourceInstanceName: { eq: "products" } }) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              name
              image
              excerpt
              slug
            }
          }
        }
      }
    }
    section: file(
      sourceInstanceName: { eq: "homepage" }
      name: { eq: "products" }
    ) {
      childMarkdownRemark {
        frontmatter {
          title
          lead
        }
      }
    }
  }
`

const styles = {
  products: { paddingTop: [60, 60, 105], paddingBottom: [60, 60, 105] },
  title: { color: "white", fontSize: 5 },
  lead: { color: "light", maxWidth: "373px", fontSize: 2 },
  listWrapper: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "273px",
    padding: "0 24px",
    marginTop: "64px",
  },
  list: {
    height: "100%",
    listStyle: "none",
    listStylePosition: "outside",
    marginBlockStart: 0,
    marginBlockEnd: 0,
    paddingInlineStart: 0,
  },
}

export default HomepageProducts
