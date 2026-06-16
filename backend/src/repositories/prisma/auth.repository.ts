import { DatabaseError } from "@/errors/index.js";
import { prisma } from "@/prisma.js";
import type { signUpType, activationLinkType } from "@/types/auth/auth.js";
import { ROLES } from "@/types/auth/roles.js";
import * as bcrypt from "bcrypt";

export class AuthRepository {
  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: signUpType & activationLinkType) {
    const { email, firstName, link, password } = data;

    const userRole = await prisma.role.findUnique({
      where: {
        role: "USER",
      },
    });

    if (!userRole?.id) throw new DatabaseError("Unable to find user role id!");

    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: {
        email,
        firstName,
        password: hashedPassword,
        activationLink: link,
        roleId: userRole.id,
      },
    });
  }

  async activateUser(data: activationLinkType) {
    const { link } = data;
    return await prisma.user.update({
      where: { activationLink: link },
      data: { isActivated: true },
    });
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    try {
      await prisma.token.upsert({
        where: { userId },
        update: { refreshToken },
        create: { userId, refreshToken },
      });
    } catch (err: any) {
      throw new DatabaseError("Unable to save refresh token!");
    }
  }

  async findRefreshToken(refreshToken: string) {
    return await prisma.token.findUnique({
      where: { refreshToken },
    });
  }

  async removeRefreshToken(refreshToken: string) {
    return await prisma.token.delete({
      where: { refreshToken },
      select: {
        refreshToken: true,
      },
    });
  }
}
