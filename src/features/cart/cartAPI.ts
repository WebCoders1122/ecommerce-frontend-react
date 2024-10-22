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
//to fetch products by user id
export const fetchCartProductsByUserId = async (userId: string) => {
  const response = await axios.get("http://localhost:8080/cart?user=" + userId);
  const data = response.data;
  return data;
};
//to update product
export const updateProductQuantity = async (update: ProductToAddType) => {
  console.log(update);
  const response = await fetch("http://localhost:8080/cart/" + update.id, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};
//to remove product
export const removeFromCart = async (product: ProductToAddType) => {
  const response = await fetch("http://localhost:8080/cart/" + product.id, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};

// to reset cart
export const resetCart = async (userId: string) => {
  const cartProducts = await fetchCartProductsByUserId(userId);
  for (const product of cartProducts) {
    await removeFromCart(product);
  }
  return true;
};
