import axios from "axios";

const API_URL = "https://connections-api.goit.global/";

export const loginUser = async ({ email, password }) => {
  const response = await axios.post(`${API_URL}users/login`, {
    email,
    password,
  });
  return response.data; // Zakładając, że response.data zawiera { user, token }
};
