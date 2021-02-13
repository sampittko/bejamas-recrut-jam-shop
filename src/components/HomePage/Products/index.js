/** @jsx jsx */
import { useStaticQuery, graphql } from "gatsby"
import React, { useContext } from "react"
import { jsx } from "theme-ui"
import { ShoppingCartContext } from "../../../hooks/useShoppingCart"
import { Row, Col } from "../../Grid"

function HomepageProducts() {
  const data = useStaticQuery(query)
  const [items, addItem, removeItem] = useContext(ShoppingCartContext)

  const products = data.allFile.edges
  const section = data.file.childMarkdownRemark

  return (
    <section sx={styles.section}>
      <Row>
        <Col>
          <h1 sx={styles.h1}>{section.frontmatter.title}</h1>
          <p sx={styles.p}>{section.frontmatter.lead}</p>
        </Col>
      </Row>
      <Row styles={styles.listWrapper}>
        <ul sx={styles.list}>
          {products.map((edge) => {
            const product = edge.node.childMarkdownRemark.frontmatter
            const { name, excerpt, slug, image } = product
            const productInCart = items.some((item) => item.slug === slug)

            return (
              <li sx={styles.product} key={slug}>
                <img
                  sx={styles.productImage}
                  src={image}
                  alt={`Vector ${name}`}
                />
                <h2 sx={styles.productName}>{name}</h2>
                <p sx={styles.productDescription}>{excerpt}</p>
                <button
                  sx={{
                    ...styles.productAction,
                    ...(productInCart && styles.removeProduct),
                  }}
                  onClick={() =>
                    !productInCart ? addItem(product) : removeItem(product)
                  }
                >
                  {!productInCart ? "+" : "-"}
                </button>
              </li>
            )
          })}
        </ul>
      </Row>
    </section>
  )
}

const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "products" } }) {
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
    file(sourceInstanceName: { eq: "homepage" }, name: { eq: "products" }) {
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
  section: { paddingTop: [60, 60, 105], paddingBottom: [60, 60, 105] },
  h1: { color: "white", fontSize: 5 },
  p: { color: "light", maxWidth: "373px", fontSize: 2 },
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
  product: {
    position: "relative",
    borderRadius: "2px",
    padding: "22px",
    margin: "0 20px",
    boxSizing: "border-box",
    border: "4px solid #969393",
    backgroundColor: "#331F41",
    width: "25%",
    height: "100%",
    float: "left",
    "&:first-child": {
      marginLeft: 0,
    },
  },
  productImage: {
    display: "block",
    margin: "0 auto",
  },
  productName: {
    color: "white",
    fontSize: 3,
    textTransform: "uppercase",
    marginTop: "35px",
  },
  productDescription: {
    margin: 0,
    color: "light",
    fontSize: 2,
  },
  productAction: {
    padding: 0,
    position: "absolute",
    bottom: "10px",
    right: "10px",
    variant: ["button.primary"],
    width: "44px",
    height: "44px",
    lineHeight: "44px",
    fontSize: 6,
    textAlign: "center",
    borderRadius: "100%",
  },
  removeProduct: {
    backgroundColor: "primary",
  },
}

export default HomepageProducts
