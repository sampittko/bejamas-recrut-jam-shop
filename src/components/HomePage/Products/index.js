/** @jsx jsx */
import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { jsx } from "theme-ui"
import { Row, Col } from "../../Grid"

function HomepageProducts() {
  const data = useStaticQuery(query)
  const products = data.allFile.edges
  const section = data.file.childMarkdownRemark

  return (
    <section>
      <Row>
        <Col>
          <h1>{section.frontmatter.title}</h1>
          <p>{section.frontmatter.lead}</p>
        </Col>
      </Row>
      <Row>
        {products.map((edge) => {
          const product = edge.node.childMarkdownRemark
          const { name, excerpt, slug, image } = product.frontmatter

          return (
            <Col key={slug}>
              <img src={image} alt={`Vector ${name}`} />
              <h2>{name}</h2>
              <p>{excerpt}</p>
            </Col>
          )
        })}
      </Row>
    </section>
  )
}

const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "products" } }) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              name
              image
              excerpt
              slug
            }
          }
        }
      }
    }
    file(sourceInstanceName: { eq: "homepage" }, name: { eq: "products" }) {
      childMarkdownRemark {
        frontmatter {
          title
          lead
        }
      }
    }
  }
`

export default HomepageProducts
