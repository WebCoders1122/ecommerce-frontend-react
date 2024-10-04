import axios, { AxiosResponse } from "axios"

export const fetchProducts = async () => {
  const response: AxiosResponse<ProductType[]> = await axios.get(
    "http://localhost:8800/products",
  )
  return response.data
}
