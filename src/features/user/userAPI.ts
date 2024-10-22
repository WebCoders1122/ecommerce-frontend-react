import axios, { AxiosResponse } from "axios";

// to fetch user orders
export const fetchUserOrderById = async (userId: string): OrderType[] => {
  const response: AxiosResponse = await axios.get(
    `http://localhost:8080/users/${userId}`,
  );
  const user = response.data;
  const orders = user.orders;
};
