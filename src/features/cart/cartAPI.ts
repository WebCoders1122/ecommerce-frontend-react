import axios from "axios";

// A mock function to mimic making an async request for data
export const addToCart = async (product: ProductToAddType) => {
  const response = await axios.post(
    "http://localhost:8080/cart",
    JSON.stringify(product),
  );
  const data = response.data;
  return data;
};
