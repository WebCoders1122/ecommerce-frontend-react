import axios, { AxiosResponse } from "axios";

// A mock function to mimic making an async request for data
export const registerUser = (registerData: {
  email: string;
  password: string;
}) => {
  return new Promise<string>(async (resolve, reject) => {
    const response: AxiosResponse = await axios.post(
      "http://localhost:8080/users",
      JSON.stringify(registerData),
    );
    resolve(response.data.email);
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
    return response.data[0].email;
  }
};
