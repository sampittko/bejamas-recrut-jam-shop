/** @jsx jsx */
import { useStaticQuery, graphql } from "gatsby"
import React, { useContext } from "react"
import { Styled } from "theme-ui"
import { jsx } from "theme-ui"
import { ShoppingCartContext } from "../../../hooks/useShoppingCart"
import { Row, Col } from "../../Grid"
import Product from "./Product"
import Slider from "react-slick"
import SliderArrow from "./SliderArrow"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  autoplay: true,
  autoplaySpeed: 5000,
  nextArrow: <SliderArrow orientation="right" />,
  prevArrow: <SliderArrow orientation="left" />,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1240,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
}

const query = graphql`
  query {
    products: allFile(filter: { sourceInstanceName: { eq: "products" } }) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              name
              image
              excerpt
              slug
              price
            }
          }
        }
      }
    }
    section: file(
      sourceInstanceName: { eq: "homepage" }
      name: { eq: "products" }
    ) {
      childMarkdownRemark {
        frontmatter {
          title
          lead
        }
      }
    }
  }
`

function HomepageProducts() {
  const data = useStaticQuery(query)
  const [{ items }] = useContext(ShoppingCartContext)

  const allProducts = data.products.edges
  const section = data.section.childMarkdownRemark.frontmatter

  return (
    <section sx={styles.products}>
      <Row>
        <Col>
          <Styled.h2 sx={styles.title}>{section.title}</Styled.h2>
          <Styled.p sx={styles.lead}>{section.lead}</Styled.p>
        </Col>
      </Row>
      <Row>
        <Slider {...sliderSettings} sx={styles.slider}>
          {allProducts.map((edge) => {
            const product = edge.node.childMarkdownRemark.frontmatter
            const isInCart = items.some((item) => item.slug === product.slug)

            return (
              <Product
                key={product.slug}
                isInCart={isInCart}
                product={product}
              />
            )
          })}
        </Slider>
      </Row>
    </section>
  )
}

const styles = {
  products: { paddingTop: [60, 60, 105], paddingBottom: [60, 60, 105] },
  title: { fontFamily: "body" },
  lead: { maxWidth: "373px" },
  slider: {
    maxWidth: "100vw",
    position: "relative",
    width: "calc(100% + 40px)",
    left: [0, "-20px"],
    height: "273px",
    padding: "0 24px",
    margin: "64px 0",
  },
}

export default HomepageProducts
