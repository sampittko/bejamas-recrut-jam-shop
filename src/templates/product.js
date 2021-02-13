/** @jsx jsx */
import React, { useMemo } from "react"
import { jsx } from "theme-ui"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PropTypes from "prop-types"
import useShoppingCart, { ShoppingCartContext } from "../hooks/useShoppingCart"
import { graphql } from "gatsby"
import { Styled } from "theme-ui"

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
          <div sx={styles.imageWrapper}>
            <img src={image} alt={`Vector ${name}`} sx={styles.image} />
          </div>
          <div sx={styles.details}>
            <p sx={styles.tag}>{tag}</p>
            <Styled.h2 sx={styles.name}>{name}</Styled.h2>
            <Styled.p sx={styles.description}>{description}</Styled.p>
            <p sx={styles.price}>{price}</p>
            <button
              sx={{ ...styles.button, ...(isInCart && styles.removeButton) }}
              onClick={() =>
                !isInCart ? addItem(product) : removeItem(product)
              }
            >
              {!isInCart ? "Add to cart" : "Remove from cart"}
            </button>
          </div>
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
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: "33vw",
  },
  image: {
    display: "block",
    margin: "0 auto",
    width: "330px",
    height: "360px",
  },
  details: {
    width: "33vw",
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
