import axios, { AxiosResponse } from "axios";

// A mock function to mimic making an async request for data
export const registerUser = (registerData: {
  email: string;
  password: string;
}) => {
  return new Promise<{ email: string; id: string }>(async (resolve, reject) => {
    const response: AxiosResponse = await axios.post(
      "http://localhost:8080/users",
      JSON.stringify(registerData),
    );
    const user: { email: string; id: string } = {
      email: response.data.email,
      id: response.data.id,
    };
    resolve(user);
  });
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
    const user = { email: response.data[0].email, id: response.data[0].id };
    return user;
  }
};
