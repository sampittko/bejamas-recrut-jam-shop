/** @jsx jsx */
import React, { useContext } from "react"
import { jsx } from "theme-ui"
import { ShoppingCartContext } from "../../../hooks/useShoppingCart"
import PropTypes from "prop-types"

export default function Product({ product, isInCart }) {
  const [, { addItem, removeItem }] = useContext(ShoppingCartContext)
  const { slug, image, name, excerpt } = product

  return (
    <li key={product.slug} sx={styles.product}>
      <img sx={styles.image} src={image} alt={`Vector ${name}`} />
      <h2 sx={styles.name}>{name}</h2>
      <p sx={styles.description}>{excerpt}</p>
      <button
        sx={{
          ...styles.action,
          ...(isInCart && styles.remove),
        }}
        onClick={() => (!isInCart ? addItem(product) : removeItem(product))}
      >
        {!isInCart ? "+" : "-"}
      </button>
    </li>
  )
}

Product.propTypes = {
  product: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
  }).isRequired,
  isInCart: PropTypes.bool.isRequired,
}

const styles = {
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
  image: {
    display: "block",
    margin: "0 auto",
  },
  name: {
    color: "white",
    fontSize: 3,
    textTransform: "uppercase",
    marginTop: "35px",
  },
  description: {
    margin: 0,
    color: "light",
    fontSize: 2,
  },
  action: {
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
  remove: {
    backgroundColor: "primary",
  },
}