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
    <div sx={styles.wrapper} onClick={onClose}>
      <Container sx={styles.container}>
        <div sx={styles.listWrapper} onClick={(e) => e.stopPropagation()}>
          <ol sx={styles.list}>
            {items.map((item) => (
              <li>{item}</li>
            ))}
          </ol>
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
    </div>
  )
}

const styles = {
  wrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    cursor: "pointer",
    backdropFilter: "blur(3px)",
    zIndex: 1,
  },
  container: {
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
    bottom: "25px",
    right: "25px",
  },
}
