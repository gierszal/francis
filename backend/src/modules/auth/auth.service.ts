import {
  ConflictError,
  InvalidCredentialsError,
  InvalidTokenError,
  UnauthorizedError,
} from "@/errors/ApiError.js";
import { v4 as uuidv4 } from "uuid";
import type {
  IAuthRepository,
  IAuthService,
  SignInDTO,
  SignUpDTO,
  ActivationLinkDTO,
  AuthResult,
} from "@/types/auth/index.js";
import * as bcrypt from "bcrypt";
import type { TokenServiceType } from "@/types/services/tokenService.js";
import type { MailServiceType } from "@/types/services/mailService.js";
import {
  formatUser,
  formatUserPayload,
} from "@/utils/formatters/user.formatter.js";
import type { FormattedUser } from "@/types/user/user.model.js";

export class AuthService implements IAuthService {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly tokenService: TokenServiceType,
    private readonly mailService: MailServiceType,
  ) {}

  async signUp(data: SignUpDTO): Promise<AuthResult> {
    const { email } = data;
    const existing = await this.authRepository.findUserByEmail(email);
    if (existing)
      throw new ConflictError("User with this email already exists!");

    const activationLink = uuidv4();
    const userData = { ...data, link: activationLink };
    const user = await this.authRepository.createUser(userData);
    const payload = formatUserPayload(user);
    const tokens = this.tokenService.generateTokens(payload);

    await this.authRepository.saveRefreshToken(user.id, tokens.refreshToken);
    await this.mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/v1/auth/activate/${activationLink}`,
    );

    return { user: formatUser(user), tokens };
  }

  async signIn(data: SignInDTO): Promise<AuthResult> {
    const { email, password } = data;
    const user = await this.authRepository.findUserByEmail(email);
    if (!user)
      throw new InvalidCredentialsError("User with this email does not exist!");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new InvalidCredentialsError("Passwords do not match!");

    const payload = formatUserPayload(user);
    const tokens = this.tokenService.generateTokens(payload);
    await this.authRepository.saveRefreshToken(user.id, tokens.refreshToken);
    return { user: formatUser(user), tokens };
  }

  async refresh(
    refreshToken: string,
  ): Promise<Pick<AuthResult, "tokens">["tokens"]> {
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

  async signOut(refreshToken: string): Promise<void> {
    await this.authRepository.removeRefreshToken(refreshToken);
  }

  async activate(data: ActivationLinkDTO): Promise<void> {
    await this.authRepository.activateUser(data);
  }
}
