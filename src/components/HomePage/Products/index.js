/** @jsx jsx */
import { useStaticQuery, graphql } from "gatsby"
import React, { useContext } from "react"
import { Styled } from "theme-ui"
import { jsx } from "theme-ui"
import { ShoppingCartContext } from "../../../hooks/useShoppingCart"
import { Row, Col } from "../../Grid"
import Product from "./Product"

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
              price
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

function HomepageProducts() {
  const data = useStaticQuery(query)
  const [{ items }] = useContext(ShoppingCartContext)

  const allProducts = data.products.edges
  const section = data.section.childMarkdownRemark.frontmatter

  return (
    <section sx={styles.products}>
      <Row>
        <Col>
          <Styled.h2 sx={styles.title}>{section.title}</Styled.h2>
          <Styled.p sx={styles.lead}>{section.lead}</Styled.p>
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

const styles = {
  products: { paddingTop: [60, 60, 105], paddingBottom: [60, 60, 105] },
  title: { fontFamily: "body" },
  lead: { maxWidth: "373px" },
  listWrapper: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "273px",
    padding: "0 24px",
    margin: "64px 0",
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
