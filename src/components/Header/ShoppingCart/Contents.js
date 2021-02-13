/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Container } from "../../Grid"

export default function Contents({
  items,
  onClose,
  onSubmit,
  onRemoveItem,
  isEmpty,
}) {
  return (
    <>
      <div sx={styles.overlay} onClick={onClose} />
      <Container sx={styles.contents}>
        <div sx={styles.listWrapper} onClick={(e) => e.stopPropagation()}>
          <ul sx={styles.list}>
            {items.map((item) => (
              <li key={item.slug} onClick={() => onRemoveItem(item)}>
                {item.name}
              </li>
            ))}
          </ul>
          <div sx={styles.buttonWrapper}>
            <button
              sx={{ variant: ["button.primary", "button.size.small"] }}
              onClick={onSubmit}
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
  list: {},
  buttonWrapper: {
    position: "absolute",
    bottom: "23px",
    right: "30px",
  },
}
