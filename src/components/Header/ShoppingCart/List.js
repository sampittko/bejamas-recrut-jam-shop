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
    zIndex: 2,
  },
  list: {
    padding: [0, 0, 0, "inherit"],
    width: ["90vw", "100%"],
    top: 0,
    position: "absolute",
    marginTop: "calc(34px + 40px)",
    display: "flex",
    justifyContent: "flex-end",
  },
  contentsWrapper: {
    overflow: "hidden",
    position: "relative",
    cursor: "initial",
    width: ["100%", "276px"],
    height: "281px",
    backgroundColor: "primary",
    border: "2px solid",
    borderRadius: "4px",
    marginRight: [0, "15px", "15px", "30px", "-20px", "-90px", "-50px"],
    zIndex: 3,
  },
  contents: {
    paddingTop: "30px",
    height: "calc(100% - 60px - 10px)",
    overflowY: "scroll",
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
