import {
  ConflictError,
  InvalidCredentialsError,
  InvalidTokenError,
  UnauthorizedError,
} from "@/errors/index.js";
import { v4 as uuidv4 } from "uuid";
import type {
  activationLinkType,
  AuthRepositoryType,
  AuthServiceType,
  signInType,
  signUpType,
} from "@/types/auth/auth.js";
import { UserPayloadDTO } from "@/DTO/userDTO.js";
import * as bcrypt from "bcrypt";
import type { TokenServiceType } from "@/types/services/tokenService.js";
import type { MailServiceType } from "@/types/services/mailService.js";

export class AuthService implements AuthServiceType {
  constructor(
    private authRepository: AuthRepositoryType,
    private tokenService: TokenServiceType,
    private mailService: MailServiceType,
  ) {}

  async signUp(data: signUpType) {
    const { email } = data;
    const existing = await this.authRepository.findUserByEmail(email);
    if (existing)
      throw new ConflictError("User with this email already exists!");

    const activationLink = uuidv4();

    const userData = { ...data, link: activationLink };

    const user = await this.authRepository.createUser(userData);

    const payload = new UserPayloadDTO(user);

    const tokens = this.tokenService.generateTokens(payload);

    await this.authRepository.saveRefreshToken(user.id, tokens.refreshToken);
    await this.mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/v1/auth/activate/${activationLink}`,
    );

    return { user: payload, tokens };
  }

  async signIn(data: signInType) {
    const { email, password } = data;

    const user = await this.authRepository.findUserByEmail(email);

    if (!user)
      throw new InvalidCredentialsError("User with this email does not exist!");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new InvalidCredentialsError("Passwords do not match!");

    const payload = new UserPayloadDTO(user);
    const tokens = this.tokenService.generateTokens(payload);

    await this.authRepository.saveRefreshToken(user.id, tokens.refreshToken);

    return { user: payload, tokens };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken)
      throw new InvalidTokenError("Refresh token is not valid!");

    const userData = this.tokenService.validateRefreshToken(refreshToken);

    const dbUserData = await this.authRepository.findRefreshToken(refreshToken);

    if (!dbUserData || !userData)
      throw new UnauthorizedError("Unathorized error");

    const newTokens = this.tokenService.generateTokens(userData);

    await this.authRepository.saveRefreshToken(
      userData.id,
      newTokens.refreshToken,
    );

    return newTokens;
  }

  async signOut(refreshToken: string) {
    return await this.authRepository.removeRefreshToken(refreshToken);
  }

  async activate(data: activationLinkType) {
    return await this.authRepository.activateUser(data);
  }
}
