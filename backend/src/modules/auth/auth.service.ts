import type { AuthRepository } from "@/repositories/prisma/auth.repository.js";
import type {
  activationLinkType,
  AuthServiceType,
  signUpType,
} from "@/types/auth/auth.js";

export class AuthService implements AuthServiceType {
  constructor(private authRepository: AuthRepository) {}
  async signUp(data: signUpType) {
    return {
      message: "signUp",
      data,
    };
  }

  async signIn(data: signUpType) {
    return {
      message: "signIn",
      data,
    };
  }

  async signOut() {
    return {
      message: "signOut",
    };
  }

  async refresh() {
    return {
      message: "refresh",
    };
  }

  async activate(link: activationLinkType["link"]) {
    return {
      message: "activate",
    };
  }
}
