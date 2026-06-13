import type {} from "@/generated/prisma/client.js";
import { prisma } from "@/prisma.js";
import type { signUpType } from "@/types/auth/auth.js";
import type { queryType } from "@/types/common/query.js";

export class AuthRepository {
  async signUp(data: signUpType) {
    try {
      const { email, password } = data;
      const candidate = await prisma.user.findUnique({ where: { email } });
    } catch (e) {
      throw e;
    }
  }
  async signIn(data: signUpType) {}
  async signOut(resfreshToken: string) {}
  async refresh(resfreshToken: string) {}
  async activate(activationLink: string) {}
}
