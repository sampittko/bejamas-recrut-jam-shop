/** @jsx jsx */
import React, { useState } from "react"
import { jsx } from "theme-ui"
import useShoppingCart from "../../../hooks/useShoppingCart"
import Contents from "./Contents"

export default function ShoppingCart() {
  const [open, setOpen] = useState(false)
  const [items, _, removeItem, submit, isEmpty, itemsCount] = useShoppingCart()

  return (
    <>
      <button sx={styles.button} onClick={() => setOpen(!open)}>
        <img
          src="/images/elements/shopping_cart.svg"
          alt="Shopping Cart"
          sx={styles.shoppingCart}
        />
        <img
          src="/images/elements/chevron_up.svg"
          alt=""
          sx={{ ...styles.chevron, ...(open && styles.chevronDown) }}
        />
      </button>
      {open && (
        <Contents
          items={items}
          isEmpty={isEmpty}
          onSubmit={submit}
          onRemoveItem={removeItem}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

const styles = {
  button: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    zIndex: 2,
  },
  shoppingCart: {
    width: "30px",
    height: "25px",
  },
  chevron: {
    width: "9px",
    height: "6px",
    marginLeft: "5px",
  },
  chevronDown: {
    transform: "rotate(180deg)",
  },
}
