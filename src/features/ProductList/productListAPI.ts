import axios, { AxiosResponse } from "axios";

export const fetchProducts = async () => {
  const response: AxiosResponse = await axios.get(
    "https://dummyjson.com/products",
  );
  return response.data.products;
};

export const fetchProductsBy__Query = async (query: FilterOptionsType[]) => {
  let queryString = "";
  query.map(item => {
    if (item.sortBy) {
      queryString = `?sortBy=${item.sortBy}&order=${item.order}`;
    } else {
      item.key === "category"
        ? (queryString = `/category/${item.value}`)
        : (queryString = "/search?q" + "=" + item.value?.split(" ").join("-"));
    }
  });
  const response: AxiosResponse = await axios.get(
    `https://dummyjson.com/products${queryString}`,
  );
  console.log(response.data.products, "response.data.products");
  return response.data.products;
};

//todo: remove all un necessary console logs
