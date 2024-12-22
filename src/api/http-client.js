import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  timeout: 3_000,
  headers: { "Content-Type": "application/json" },
});

export const setAuthHeader = (token) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  client.defaults.headers.common.Authorization = "";
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fakeClient = {
  request: async (dataToReturn) => {
    await sleep(2_000);
    return dataToReturn;
  },
};
