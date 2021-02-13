/** @jsx jsx */
import React, { useContext } from "react"
import { jsx } from "theme-ui"
import { ShoppingCartContext } from "../../../hooks/useShoppingCart"
import { Container } from "../../Grid"

export default function Contents({ onClose }) {
  const [{ items, isEmpty }, { removeItem, submit }] = useContext(
    ShoppingCartContext
  )

  return (
    <>
      <div sx={styles.overlay} onClick={onClose} />
      <Container sx={styles.contents}>
        <div sx={styles.listWrapper} onClick={(e) => e.stopPropagation()}>
          <ul>
            {items.map((item) => (
              <li key={item.slug} onClick={() => removeItem(item)}>
                {item.name}
              </li>
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
  contents: {
    width: "100%",
    top: 0,
    position: "absolute",
    marginTop: "calc(34px + 40px)",
    display: "flex",
    justifyContent: "flex-end",
  },
  listWrapper: {
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
  buttonWrapper: {
    position: "absolute",
    bottom: "23px",
    right: "30px",
  },
}
