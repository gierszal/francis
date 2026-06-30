import $api from "..";

export const userApi = {
  getUser: async () => {
    return $api.get("/users/me");
  },
};
