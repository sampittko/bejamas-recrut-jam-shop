/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Row, Col } from "../components/Grid"
import { Container } from "../components/Grid"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PropTypes from "prop-types"

function ProductTemplate({ pageContext }) {
  const { name, image } = pageContext

  return (
    <Layout>
      <SEO title={name} />
      <Container>
        <Row>
          <Col>
            <img src={image} alt={`Vector ${name}`} />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </Layout>
  )
}

ProductTemplate.propTypes = {
  pageContext: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default ProductTemplate
