import type { AuthRepository } from "@/repositories/prisma/auth.repository.js";
import type {
  activationLinkType,
  AuthServiceType,
  signUpType,
} from "@/types/auth/auth.js";

export class AuthService implements AuthServiceType {
  constructor(private authRepository: AuthRepository) {}

  async signUp(data: signUpType) {
    return await this.authRepository.signUp(data);
  }

  async signIn(data: signUpType) {
    return await this.authRepository.signIn(data);
  }

  async signOut(refreshToken: string) {
    return await this.authRepository.signOut(refreshToken);
  }

  async refresh(refreshToken: string) {
    return await this.authRepository.signOut(refreshToken);
  }

  async activate(link: activationLinkType["link"]) {
    return await this.authRepository.signOut(link);
  }
}
