import $api from "@/api";
import { AuthResult } from "@/types/auth";
import type { AxiosResponse } from "axios";

export default class AuthService {
  static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResult>> {
    return $api.post<AuthResult>("/login", { email, password });
  }

  static async registration(
    firstName: string,
    email: string,
    password: string,
    lastName?: string,
  ): Promise<AxiosResponse<AuthResult>> {
    return $api.post<AuthResult>("/registration", {
      email,
      password,
      firstName,
      lastName,
    });
  }

  static async logout(): Promise<AxiosResponse<AuthResult>> {
    return $api.post<AuthResult>("/logout");
  }
}
