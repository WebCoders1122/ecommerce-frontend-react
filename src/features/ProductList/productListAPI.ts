import axios, { AxiosResponse } from "axios"

export const fetchProducts = async () => {
  const response: AxiosResponse = await axios.get(
    "https://dummyjson.com/products",
  )
  console.log(response)
  return response.data.products
}

export const fetchProductsBy__Query = async (query: FilterOptionsType[]) => {
  let queryString = query.map(item => {
    return item.key === "category"
      ? `/category/${item.value}`
      : "/search?q" + "=" + item.value.split(" ").join("-")
  })
  console.log(queryString)
  const response: AxiosResponse = await axios.get(
    `https://dummyjson.com/products${queryString[0]}`,
  )

  console.log(response, queryString)
  return response.data.products
}
