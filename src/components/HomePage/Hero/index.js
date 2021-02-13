/** @jsx jsx */
import React from "react"
import { jsx, Styled } from "theme-ui"
import { Row, Col } from "../../Grid"
import { navigate } from "@reach/router"

import { useStaticQuery, graphql } from "gatsby"

const query = graphql`
  query {
    hero: file(sourceInstanceName: { eq: "homepage" }, name: { eq: "hero" }) {
      childMarkdownRemark {
        frontmatter {
          cta {
            href
            text
          }
          image
          title
        }
      }
    }
  }
`

function HomepageHero() {
  const data = useStaticQuery(query)
  const hero = data.hero.childMarkdownRemark

  return (
    <section sx={styles.hero}>
      <Row styles={styles.row}>
        <Col styles={styles.imageWrapper}>
          <img
            src={hero.frontmatter.image}
            alt="Vector Monitor"
            sx={styles.image}
          />
        </Col>
        <Col styles={styles.leadWrapper}>
          <Styled.h1
            sx={styles.title}
            dangerouslySetInnerHTML={{ __html: hero.frontmatter.title }}
          />
          <button
            onClick={() => navigate(hero.frontmatter.cta.href)}
            sx={styles.cta}
          >
            {hero.frontmatter.cta.text}
          </button>
        </Col>
      </Row>
      <img
        src="/images/elements/hero_background.svg"
        sx={styles.backgroundImg}
      />
    </section>
  )
}

export default HomepageHero

const styles = {
  hero: { paddingTop: [60, 60, 105], paddingBottom: [60, 60, 105] },
  row: { justifyContent: ["center"] },
  image: { maxWidth: "1" },
  cta: {
    variant: ["button.primary", "button.size.large"],
    mx: ["auto", null, 0],
  },
  title: {
    variant: "text.heading",
    position: "relative",
    ml: [null, null, null, "30px"],
    textAlign: ["center", null, "left"],
    textShadow: "1px 2px rgba(0, 0, 0, .2)",
    "::after": {
      position: "absolute",
      content: `url("/images/elements/hero_decor.svg")`,
      width: "97px",
      height: "43px",
      top: -15,
      right: -55,
      display: ["none", null, null, "block"],
      zIndex: -1,
    },
  },

  imageWrapper: {
    width: ["1", "1", "2/5", null, 450],
    textAlign: ["center", "center", "left"],
    order: [2, 2, 1],
  },

  leadWrapper: {
    width: ["1", "1", "3/5", null, 650],
    ml: ["auto", 0, 0, 0, 0, 100],
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    order: [1, 1, 2],
    mb: ["65px", "65px", 0],
  },

  backgroundImg: {
    position: "absolute",
    top: 0,
    right: 0,
    display: ["none", null, "block"],
    zIndex: -1,
  },
}
