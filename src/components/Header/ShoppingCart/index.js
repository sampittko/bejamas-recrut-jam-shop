/** @jsx jsx */
import React, { useContext, useEffect, useState } from "react"
import { jsx } from "theme-ui"
import { ShoppingCartContext } from "../../../hooks/useShoppingCart"
import List from "./List"

export default function ShoppingCart() {
  const [open, setOpen] = useState(false)
  const [{ isEmpty, itemsCount }] = useContext(ShoppingCartContext)

  useEffect(() => {
    if (open && isEmpty) {
      setOpen(false)
    }
  }, [open, isEmpty])

  return (
    <>
      <button
        sx={styles.button}
        disabled={isEmpty}
        onClick={() => setOpen(!open)}
      >
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
        <div sx={{ ...styles.badge, ...(isEmpty && styles.badgeEmpty) }}>
          {itemsCount}
        </div>
      </button>
      {open && <List onClose={() => setOpen(false)} />}
    </>
  )
}

const styles = {
  button: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    color: "#fff",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    zIndex: 2,
    "&:disabled": {
      cursor: "default",
    },
  },
  shoppingCart: {
    width: "30px",
    height: "25px",
  },
  chevron: {
    width: "9px",
    height: "6px",
    marginLeft: 2,
    transform: "rotate(180deg)",
  },
  chevronDown: {
    transform: "rotate(0deg)",
  },
  badge: {
    width: "11px",
    height: "12px",
    lineHeight: "12px",
    textAlign: "center",
    position: "absolute",
    fontSize: "8px",
    top: "7px",
    paddingLeft: "1px",
    left: "27px",
    borderRadius: "25px",
    backgroundColor: "accent",
  },
  badgeEmpty: {
    backgroundColor: "#301346",
  },
}
