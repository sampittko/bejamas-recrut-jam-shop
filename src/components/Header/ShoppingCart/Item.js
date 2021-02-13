/** @jsx jsx */
import React, { useContext } from "react"
import { jsx } from "theme-ui"
import { ShoppingCartContext } from "../../../hooks/useShoppingCart"
import PropTypes from "prop-types"

export default function Item({ item, order }) {
  const [, { removeItem }] = useContext(ShoppingCartContext)

  return (
    <li key={item.slug} sx={styles.item} onClick={() => removeItem(item)}>
      <div sx={styles.nameWrapper}>
        <img src={item.image} alt={`Vector ${item.name}`} sx={styles.image} />
        <span sx={styles.name}>
          {item.name} #{order}
        </span>
      </div>
      <span sx={styles.price}>{item.price}</span>
    </li>
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  order: PropTypes.number.isRequired,
}

const styles = {
  item: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    fontSize: 1,
    color: "white",
    "&:hover": {
      cursor: "pointer",
    },
  },
  image: {
    width: "26px",
    height: "32px",
  },
  nameWrapper: {
    paddingLeft: "3px",
    width: "70%",
    display: "flex",
    alignItems: "center",
  },
  name: {
    marginLeft: "10px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  price: {
    textAlign: "center",
    paddingLeft: "10px",
    width: "30%",
    fontWeight: "500",
    "&::before": {
      content: '"$"',
    },
  },
}
