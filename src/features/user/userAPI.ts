import axios, { AxiosResponse } from "axios";

//to get userinfo
export const getUserInfo = async (userId: string): Promise<UserInfoType> => {
  const response: AxiosResponse = await axios.get(
    `http://localhost:8080/users/${userId}`,
  );
  const user: UserInfoType = {
    id: response.data.id,
    email: response.data.email,
    addresses: response.data.addresses || [],
  };
  return user;
};

// to fetch user orders
export const fetchUserOrderById = async (
  userId: string,
): Promise<OrderType[]> => {
  const response: AxiosResponse = await axios.get(
    `http://localhost:8080/users/${userId}`,
  );
  const user = response.data;
  const orders = user.orders;
  return orders;
};

// to add new address
export const addNewAddress = async ({
  address,
  userId,
}: {
  address: AddressType;
  userId: string;
}) => {
  const user = await axios
    .get(`http://localhost:8080/users/${userId}`)
    .then(res => res.data);
  if (!user) {
    throw new Error("User not found");
  }
  console.log(user, "user");
  const newUser = user.addresses
    ? {
        ...user,
        addresses: [...user?.addresses, address],
      }
    : {
        ...user,
        addresses: [address],
      };

  console.log(newUser, "new");

  const response = await fetch(`http://localhost:8080/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  const data = await response.json();
  return data;
};
