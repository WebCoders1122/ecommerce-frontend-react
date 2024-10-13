import axios, { AxiosResponse } from "axios";

//to create new order
export const createNewOrder = async (order: OrderType) => {
  const response: AxiosResponse<OrderType> = await axios.post(
    "http://localhost:8080/orders",
    order,
  );
  return response.data;
};
