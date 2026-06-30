import { SignInDTO, SignUpDTO } from "@/types/auth";
import $api from "..";

export const authApi = {
  signIn: async (data: SignInDTO) => {
    return $api.post("/auth/sign-in", data);
  },

  signUp: async (data: SignUpDTO) => {
    return $api.post("/auth/sign-up", data);
  },

  logout: async () => {
    return $api.post("/auth/logout");
  },
};
