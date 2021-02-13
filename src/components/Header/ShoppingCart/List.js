/** @jsx jsx */
import React, { useContext } from "react"
import { jsx } from "theme-ui"
import { ShoppingCartContext } from "../../../hooks/useShoppingCart"
import { Container } from "../../Grid"
import PropTypes from "prop-types"
import Item from "./Item"

export default function List({ onClose }) {
  const [{ items, isEmpty }, { submit }] = useContext(ShoppingCartContext)

  return (
    <>
      <div sx={styles.overlay} onClick={onClose} />
      <Container sx={styles.list}>
        <div sx={styles.contentsWrapper} onClick={(e) => e.stopPropagation()}>
          <ul sx={styles.contents}>
            {items.map((item, i) => (
              <Item key={item.slug} item={item} order={i + 1} />
            ))}
          </ul>
          <div sx={styles.buttonWrapper}>
            <button
              sx={{ variant: ["button.primary", "button.size.small"] }}
              onClick={submit}
              disabled={isEmpty}
            >
              Submit
            </button>
          </div>
        </div>
      </Container>
    </>
  )
}

List.propTypes = {
  onClose: PropTypes.func.isRequired,
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    cursor: "pointer",
    backdropFilter: "blur(3px) brightness(90%)",
    zIndex: 1,
  },
  list: {
    width: "100%",
    top: 0,
    position: "absolute",
    marginTop: "calc(34px + 40px)",
    display: "flex",
    justifyContent: "flex-end",
  },
  contentsWrapper: {
    position: "relative",
    cursor: "initial",
    width: "276px",
    height: "281px",
    backgroundColor: "primary",
    border: "2px solid",
    borderRadius: "4px",
    marginRight: "-50px",
    zIndex: 2,
  },
  contents: {
    padding: "30px 0",
    listStyle: "none",
    paddingInlineStart: 0,
    margin: "0 10px",
  },
  buttonWrapper: {
    position: "absolute",
    bottom: "23px",
    right: "30px",
  },
}
