import type { User } from "@/generated/prisma/client.js";
import { prisma } from "@/prisma.js";
import type {
  SignUpDTO,
  ActivationLinkDTO,
  RefreshTokenResponse,
} from "@/types/auth/index.js";
import { ROLES } from "@/types/auth/index.js";
import * as bcrypt from "bcrypt";

export class AuthRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
      include: {
        role: {
          select: {
            role: true,
          },
        },
      },
    });
  }

  async createUser(data: SignUpDTO & ActivationLinkDTO): Promise<User> {
    const { email, firstName, link, password } = data;

    const userRole = ROLES.USER;

    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        email,
        firstName,
        password: hashedPassword,
        activationLink: link,
        roleId: userRole.id,
      },
      include: {
        role: {
          select: {
            role: true,
          },
        },
      },
    });
  }

  async activateUser(data: ActivationLinkDTO): Promise<User> {
    const { link } = data;
    return prisma.user.update({
      where: { activationLink: link },
      data: { isActivated: true },
      include: {
        role: {
          select: {
            role: true,
          },
        },
      },
    });
  }

  async saveRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<RefreshTokenResponse> {
    return prisma.token.upsert({
      where: { userId },
      update: { refreshToken },
      create: { userId, refreshToken },
    });
  }

  async findRefreshToken(
    refreshToken: string,
  ): Promise<RefreshTokenResponse | null> {
    return prisma.token.findUnique({
      where: { refreshToken },
    });
  }

  async removeRefreshToken(refreshToken: string): Promise<void> {
    await prisma.token.delete({
      where: { refreshToken },
      select: {
        refreshToken: true,
      },
    });
  }
}
