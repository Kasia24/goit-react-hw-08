import { client, fakeClient } from "./http-client";

const exampleCurrentUser = {
  userId: "12345",
  username: "Kuba",
};

const exampleAuthResponse = {
  ...exampleCurrentUser,
  token: "JWT-TOKEN",
};

const usingFake = true;

const FakeAuthApi = {
  register: async ({ email, password }) =>
    fakeClient.request(exampleAuthResponse),
  login: async ({ email, password }) => fakeClient.request(exampleAuthResponse),
  logout: async () => ({ ok: true }),
  getCurrentUser: async () => fakeClient.request(exampleCurrentUser),
};

// TODO Add Auth Header.
export const AuthApi = usingFake
  ? FakeAuthApi
  : {
      register: async ({ email, password }) => {
        const res = await client.post(`/users`, { email, password });
        return res.data;
      },
      login: async ({ email, password }) => {
        const res = await client.post(`/users/sessions`, { email, password });
        return res.data;
      },
      logout: async () => {
        const res = await client.delete(`/users/sessions/`);
        return res.data;
      },
      getCurrentUser: async () => {
        const res = await client.get(`/users/sessions`);
        return res.data;
      },
    };
