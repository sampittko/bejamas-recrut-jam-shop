import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import useShoppingCart, { ShoppingCartContext } from "../hooks/useShoppingCart"

export default function NotFoundPage() {
  const shoppingCart = useShoppingCart()

  return (
    <ShoppingCartContext.Provider value={shoppingCart}>
      <Layout>
        <SEO title="404: Not found" />
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Layout>
    </ShoppingCartContext.Provider>
  )
}
