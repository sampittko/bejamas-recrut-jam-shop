/** @jsx jsx */
import React, { useContext, useEffect, useRef, useState } from "react"
import { jsx } from "theme-ui"
import { ShoppingCartContext } from "../../../hooks/useShoppingCart"
import List from "./List"
import classNames from "classnames"

export default function ShoppingCart() {
  const [open, setOpen] = useState(false)
  const [{ isEmpty, itemsCount }] = useContext(ShoppingCartContext)

  const [onEmptyAnimation, setOnEmptyAnimation] = useState(false)
  const [onAddItemAnimation, setOnAddItemAnimation] = useState(false)
  const [onRemoveItemAnimation, setOnRemoveItemAnimation] = useState(false)

  const prevItemsCount = useRef(itemsCount)

  useEffect(() => {
    if (itemsCount > prevItemsCount.current) {
      setOnAddItemAnimation(true)
    } else if (itemsCount < prevItemsCount.current) {
      setOnRemoveItemAnimation(true)
    }
    prevItemsCount.current = itemsCount
  }, [itemsCount])

  const handleClick = function () {
    if (isEmpty) {
      setOnEmptyAnimation(true)
    } else {
      setOpen(!open)
    }
  }

  const handleBadgeAnimationEnd = function () {
    setOnAddItemAnimation(false)
    setOnRemoveItemAnimation(false)
  }

  return (
    <>
      <button
        sx={styles.button}
        className={classNames([
          "animate__animated",
          {
            ["animate__headShake"]: onEmptyAnimation,
          },
        ])}
        onClick={handleClick}
        onAnimationEnd={() => setOnEmptyAnimation(false)}
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
        <div
          sx={{ ...styles.badge, ...(isEmpty && styles.badgeEmpty) }}
          className={classNames([
            "animate__animated",
            {
              ["animate__flash"]: onRemoveItemAnimation,
              ["animate__bounce"]: onAddItemAnimation,
            },
          ])}
          onAnimationEnd={handleBadgeAnimationEnd}
        >
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
