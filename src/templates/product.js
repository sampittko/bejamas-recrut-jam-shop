/** @jsx jsx */
import React, { useMemo } from "react"
import { jsx } from "theme-ui"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PropTypes from "prop-types"
import useShoppingCart, { ShoppingCartContext } from "../hooks/useShoppingCart"
import { graphql } from "gatsby"
import { Styled } from "theme-ui"
import { Container } from "../components/Grid"

export const pageQuery = graphql`
  query ProductBySlug($slug: String!) {
    product: file(
      sourceInstanceName: { eq: "products" }
      childMarkdownRemark: { frontmatter: { slug: { eq: $slug } } }
    ) {
      childMarkdownRemark {
        frontmatter {
          tag
          name
          image
          description
          price
          slug
        }
      }
    }
  }
`

function ProductTemplate({ data }) {
  const shoppingCart = useShoppingCart()
  const [{ items }, { addItem, removeItem }] = shoppingCart

  const product = data.product.childMarkdownRemark.frontmatter
  const { tag, name, image, description, price, slug } = product

  const isInCart = useMemo(() => items.some((item) => item.slug === slug), [
    items,
    slug,
  ])

  return (
    <ShoppingCartContext.Provider value={shoppingCart}>
      <Layout>
        <SEO title={name} />
        <div sx={styles.wrapper}>
          <Container sx={styles.container}>
            <div sx={styles.imageWrapper}>
              <img src={image} alt={`Vector ${name}`} sx={styles.image} />
            </div>
            <div sx={styles.detailsWrapper}>
              <div sx={styles.details}>
                <span sx={styles.tag}>{tag}</span>
                <Styled.h2 sx={styles.name}>{name}</Styled.h2>
                <Styled.p sx={styles.description}>{description}</Styled.p>
                <span sx={styles.price}>{price}</span>
                <button
                  sx={{
                    ...styles.button,
                    ...(isInCart && styles.removeButton),
                  }}
                  onClick={() =>
                    !isInCart ? addItem(product) : removeItem(product)
                  }
                >
                  {!isInCart ? "Add to cart" : "Remove from cart"}
                </button>
              </div>
            </div>
          </Container>
        </div>
      </Layout>
    </ShoppingCartContext.Provider>
  )
}

ProductTemplate.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
}

const styles = {
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: ["block", "block", "flex"],
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    paddingTop: [8, 8, 0],
    paddingBottom: [7, 7, 0],
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: ["column", "column", "column", "column", "row"],
  },
  imageWrapper: {
    width: ["80%", "80%", "50%"],
    marginBottom: [4, 4, 5, 7, 0],
  },
  image: {
    display: "block",
    margin: "0 auto",
    width: ["100%", "100%", "100%", "100%", "440px"],
    height: ["100%", "100%", "100%", "100%", "470px"],
  },
  detailsWrapper: {
    width: ["80%", "80%", "50%"],
  },
  details: {
    maxWidth: ["100%", "100%", "100%", "100%", "80%"],
  },
  tag: {
    fontSize: 1,
    color: "secondary",
    textTransform: "uppercase",
  },
  name: {
    fontFamily: "body",
  },
  description: {
    fontSize: 3,
  },
  price: {
    display: "block",
    margin: "25px 0 15px 0",
    color: "white",
    fontWeight: "bold",
    fontSize: 4,
    "&::before": {
      content: '"$"',
    },
  },
  button: {
    variant: ["button.primary", "button.size.large"],
  },
  removeButton: {
    backgroundColor: "secondary",
    color: "primary",
  },
}

export default ProductTemplate
