import React from "react"
import Navbar from "../components/Navbar"
import ProductDetails from "../features/ProductList/components/ProductDetails"

type Props = {}

const ProductDetailsPage = (props: Props) => {
  return (
    <Navbar>
      <ProductDetails></ProductDetails>
    </Navbar>
  )
}

export default ProductDetailsPage
