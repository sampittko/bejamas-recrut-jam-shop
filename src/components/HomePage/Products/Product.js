/** @jsx jsx */
import React, { useContext } from "react"
import { jsx } from "theme-ui"
import { ShoppingCartContext } from "../../../hooks/useShoppingCart"
import PropTypes from "prop-types"
import { Styled } from "theme-ui"
import { navigate } from "gatsby"

export default function Product({ product, isInCart }) {
  const [, { addItem, removeItem }] = useContext(ShoppingCartContext)
  const { slug, image, name, excerpt } = product

  function handleClick(e) {
    e.stopPropagation()
    if (!isInCart) {
      addItem(product)
    } else {
      removeItem(product)
    }
  }

  return (
    <div sx={styles.product} onClick={() => navigate(slug)}>
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
        <span sx={styles.inButton}>{!isInCart ? "+" : "-"}</span>
      </button>
    </div>
  )
}

Product.propTypes = {
  product: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  isInCart: PropTypes.bool.isRequired,
}

const styles = {
  product: {
    "&:hover": {
      borderColor: "secondary",
      cursor: "pointer",
    },
    position: "relative",
    borderRadius: "2px",
    padding: 5,
    margin: "0 20px",
    border: "4px solid #969393",
    backgroundColor: "#331F41",
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
    display: "flex",
    justifyContent: "center",
    padding: 0,
    position: "absolute",
    bottom: "10px",
    right: "10px",
    variant: ["button.primary"],
    minWidth: "50px",
    height: "50px",
    fontSize: 6,
    borderRadius: "100%",
  },
  inButton: {
    height: "100%",
  },
  removeButton: {
    backgroundColor: "secondary",
    color: "primary",
  },
}
