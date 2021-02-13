/** @jsx jsx */
import React, { useContext } from "react"
import { jsx } from "theme-ui"
import { ShoppingCartContext } from "../../../hooks/useShoppingCart"
import PropTypes from "prop-types"
import { Styled } from "theme-ui"

export default function Product({ product, isInCart }) {
  const [, { addItem, removeItem }] = useContext(ShoppingCartContext)
  const { slug, image, name, excerpt } = product

  function handleClick(e) {
    e.preventDefault()
    if (!isInCart) {
      addItem(product)
    } else {
      removeItem(product)
    }
  }

  return (
    <a href={product.slug}>
      <li key={slug} sx={styles.product}>
        <img sx={styles.image} src={image} alt={`Vector ${name}`} />
        <Styled.h4 sx={styles.name}>{name}</Styled.h4>
        <Styled.p sx={styles.description}>{excerpt}</Styled.p>
        <button
          sx={{
            ...styles.button,
            ...(isInCart && styles.removeButton),
          }}
          onClick={handleClick}
        >
          {!isInCart ? "+" : "-"}
        </button>
      </li>
    </a>
  )
}

Product.propTypes = {
  product: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  isInCart: PropTypes.bool.isRequired,
}

const styles = {
  product: {
    "&:hover": {
      borderColor: "transparent",
    },
    position: "relative",
    borderRadius: "2px",
    padding: 5,
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
  image: {
    display: "block",
    margin: "0 auto",
  },
  name: {
    textTransform: "uppercase",
    marginTop: "35px",
    marginBottom: 0,
    fontFamily: "body",
  },
  description: {
    color: "light",
  },
  button: {
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
  removeButton: {
    backgroundColor: "secondary",
    color: "primary",
  },
}
