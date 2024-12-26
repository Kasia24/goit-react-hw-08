import axios from "axios";

const BASE_URL = "https://connections-api.goit.global";

const instance = axios.create({
  baseURL: BASE_URL,
});

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
};

export const register = (data) => instance.post("/users/signup", data);
export const login = (data) => instance.post("/users/login", data);
export const logout = () => instance.post("/users/logout");
export const fetchContacts = () => instance.get("/contacts");
export const addContact = (data) => instance.post("/contacts", data);
export const deleteContact = (id) => instance.delete(`/contacts/${id}`);
export const updateContact = (id, data) => instance.patch(`/contacts/${id}`);
