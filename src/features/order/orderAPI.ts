import axios, { AxiosResponse } from "axios";

//to create new order
export const createNewOrder = async (order: OrderType) => {
  const response: AxiosResponse<OrderType> = await axios.post(
    "http://localhost:8080/orders",
    order,
  );
  return response.data;
};

// to fetch user orders
export const fetchUserOrderById = async (
  userId: string,
): Promise<OrderType[]> => {
  const response: AxiosResponse<OrderType[]> = await axios.get(
    `http://localhost:8080/orders?userId=${userId}`,
  );
  const orders = response.data;
  return orders;
};
