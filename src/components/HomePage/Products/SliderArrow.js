/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

export default function SliderArrow({ orientation, onClick, className }) {
  const left = orientation === "left"
  const right = orientation === "right"

  return (
    <div
      onClick={onClick}
      className={className}
      sx={{
        ...styles.arrowWrapper,
        ...(left && styles.leftArrowWrapper),
        ...(right && styles.rightArrowWrapper),
      }}
    >
      <img
        src="/images/elements/arrow_left.svg"
        sx={{
          ...(left && styles.leftArrow),
          ...(right && styles.rightArrow),
        }}
        alt={`Arrow ${orientation}`}
      />
    </div>
  )
}

SliderArrow.propTypes = {
  orientation: PropTypes.oneOf(["left", "right"]).isRequired,
}

const styles = {
  arrowWrapper: {
    zIndex: 1,
    height: "65px",
    width: "65px",
    backgroundColor: "primary",
    borderRadius: "100%",
    "&:before": {
      content: "none",
    },
    "&:hover": {
      backgroundColor: "accent",
    },
  },
  leftArrowWrapper: {
    left: ["24px", "16px", "16px", "16px", "-34px"],
  },
  rightArrowWrapper: {
    right: ["24px", "16px", "16px", "16px", "-34px"],
  },
  leftArrow: {
    transform: "rotate(0deg)",
  },
  rightArrow: {
    transform: "rotate(180deg)",
  },
}
