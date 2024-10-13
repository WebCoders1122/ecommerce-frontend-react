import axios, { AxiosResponse } from "axios";

// A mock function to mimic making an async request for data
export const registerUser = (registerData: {
  email: string;
  password: string;
}) => {
  return new Promise<{ email: string; id: string; addresses: AddressType[] }>(
    async (resolve, reject) => {
      const response: AxiosResponse = await axios.post(
        "http://localhost:8080/users",
        JSON.stringify(registerData),
      );
      const user: { email: string; id: string; addresses: AddressType[] } = {
        email: response.data.email,
        id: response.data.id,
        addresses: response.data.addresses,
      };
      resolve(user);
    },
  );
};

// to login user
export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  const response: AxiosResponse = await axios.get(
    `http://localhost:8080/users?email=${loginData.email}`,
  );
  if (response.data.length === 0) {
    throw new Error("User not found");
  } else if (response.data[0].password !== loginData.password) {
    throw new Error("Incorrect password");
  } else {
    const user = {
      email: response.data[0].email,
      id: response.data[0].id,
      addresses: response.data[0].addresses,
    };
    return user;
  }
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
