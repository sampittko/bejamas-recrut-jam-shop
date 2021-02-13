import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Hero from "../components/HomePage/Hero"
import Products from "../components/HomePage/Products"
import { Container } from "../components/Grid"
import useShoppingCart, { ShoppingCartContext } from "../hooks/useShoppingCart"

export default function IndexPage() {
  const shoppingCart = useShoppingCart()

  return (
    <ShoppingCartContext.Provider value={shoppingCart}>
      <Layout>
        <SEO title="Home" />
        <Container>
          <Hero />
          <Products />
        </Container>
      </Layout>
    </ShoppingCartContext.Provider>
  )
}
