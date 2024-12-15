import axios from "axios";

const API_URL = "https://connections-api.goit.global/";

export const loginUser = async ({ username, password }) => {
  const response = await axios.post(`${API_URL}users/login`, {
    username,
    password,
  });
  return response.data; // Zakładając, że response.data zawiera { user, token }
};
