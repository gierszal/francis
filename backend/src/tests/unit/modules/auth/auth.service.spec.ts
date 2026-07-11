import { jest } from "@jest/globals";

jest.unstable_mockModule("bcrypt", () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.unstable_mockModule("uuid", () => ({
  v4: jest.fn(),
}));

const bcrypt = await import("bcrypt");
const { v4: uuidv4 } = await import("uuid");

const { AuthService } = await import("@/modules/auth/auth.service.js");
const {
  ConflictError,
  InvalidCredentialsError,
  InvalidTokenError,
  UnauthorizedError,
} = await import("@/errors/ApiError.js");
const { formatUser, formatUserPayload } =
  await import("@/utils/formatters/user.formatter.js");

describe("AuthService", () => {
  let authService: InstanceType<typeof AuthService>;
  let authRepository: any;
  let tokenService: any;
  let mailService: any;

  const mockedBcryptCompare = bcrypt.compare as jest.Mock;
  const mockedUuidv4 = uuidv4 as jest.Mock;

  beforeEach(() => {
    authRepository = {
      findUserByEmail: jest.fn(),
      createUser: jest.fn(),
      saveRefreshToken: jest.fn(),
      findRefreshToken: jest.fn(),
      removeRefreshToken: jest.fn(),
      activateUser: jest.fn(),
    };

    tokenService = {
      generateTokens: jest.fn(),
      validateRefreshToken: jest.fn(),
    };

    mailService = {
      sendActivationMail: jest.fn(),
    };

    authService = new AuthService(authRepository, tokenService, mailService);

    process.env.API_URL = "http://localhost:3000";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const baseUser = {
    id: "u1a1b1c1-1111-4111-8111-111111111111",
    email: "ye@example.com",
    password: "hashed-password",
    firstName: "ye",
    lastName: "lastName",
    isActivated: false,
    role: { role: "USER" },
  };

  const baseTokens = {
    accessToken: "access-token",
    refreshToken: "refresh-token",
  };

  describe("signUp", () => {
    const signUpDto = {
      email: baseUser.email,
      password: "plain-password",
      firstName: baseUser.firstName,
      lastName: baseUser.lastName,
    } as any;

    it("should create a user, issue tokens, and send an activation email", async () => {
      authRepository.findUserByEmail.mockResolvedValue(null);
      mockedUuidv4.mockReturnValue("generated-activation-link");
      authRepository.createUser.mockResolvedValue(baseUser);
      tokenService.generateTokens.mockReturnValue(baseTokens);

      const result = await authService.signUp(signUpDto);

      expect(authRepository.findUserByEmail).toHaveBeenCalledWith(
        baseUser.email,
      );
      expect(authRepository.createUser).toHaveBeenCalledWith({
        ...signUpDto,
        link: "generated-activation-link",
      });
      expect(authRepository.saveRefreshToken).toHaveBeenCalledWith(
        baseUser.id,
        baseTokens.refreshToken,
      );
      expect(mailService.sendActivationMail).toHaveBeenCalledWith(
        baseUser.email,
        "http://localhost:3000/api/v1/auth/activate/generated-activation-link",
      );
      expect(result).toEqual({
        user: formatUser(baseUser as any),
        tokens: baseTokens,
      });
    });

    it("should throw ConflictError when a user with this email already exists", async () => {
      authRepository.findUserByEmail.mockResolvedValue(baseUser);

      await expect(authService.signUp(signUpDto)).rejects.toThrow(
        ConflictError,
      );

      expect(authRepository.createUser).not.toHaveBeenCalled();
      expect(mailService.sendActivationMail).not.toHaveBeenCalled();
    });
  });

  describe("signIn", () => {
    const signInDto = {
      email: baseUser.email,
      password: "plain-password",
    } as any;

    it("should return user and tokens on valid credentials", async () => {
      authRepository.findUserByEmail.mockResolvedValue(baseUser);
      mockedBcryptCompare.mockReturnValue(true);
      tokenService.generateTokens.mockReturnValue(baseTokens);

      const result = await authService.signIn(signInDto);

      expect(mockedBcryptCompare).toHaveBeenCalledWith(
        signInDto.password,
        baseUser.password,
      );
      expect(authRepository.saveRefreshToken).toHaveBeenCalledWith(
        baseUser.id,
        baseTokens.refreshToken,
      );
      expect(result).toEqual({
        user: formatUser(baseUser as any),
        tokens: baseTokens,
      });
    });

    it("should throw InvalidCredentialsError when the user does not exist", async () => {
      authRepository.findUserByEmail.mockResolvedValue(null);

      await expect(authService.signIn(signInDto)).rejects.toThrow(
        InvalidCredentialsError,
      );

      expect(mockedBcryptCompare).not.toHaveBeenCalled();
    });

    it("should throw InvalidCredentialsError when the password is invalid", async () => {
      authRepository.findUserByEmail.mockResolvedValue(baseUser);
      mockedBcryptCompare.mockReturnValue(false);

      await expect(authService.signIn(signInDto)).rejects.toThrow(
        InvalidCredentialsError,
      );

      expect(tokenService.generateTokens).not.toHaveBeenCalled();
      expect(authRepository.saveRefreshToken).not.toHaveBeenCalled();
    });

    it("should give the same error for both nonexistent user and wrong password", async () => {
      authRepository.findUserByEmail.mockResolvedValue(null);
      let errorForMissingUser: any;
      try {
        await authService.signIn(signInDto);
      } catch (e) {
        errorForMissingUser = e;
      }

      authRepository.findUserByEmail.mockResolvedValue(baseUser);
      mockedBcryptCompare.mockReturnValue(false);
      let errorForWrongPassword: any;
      try {
        await authService.signIn(signInDto);
      } catch (e) {
        errorForWrongPassword = e;
      }

      expect(errorForMissingUser.message).toBe(errorForWrongPassword.message);
      expect(errorForMissingUser).toBeInstanceOf(InvalidCredentialsError);
      expect(errorForWrongPassword).toBeInstanceOf(InvalidCredentialsError);
    });
  });

  describe("refresh", () => {
    const validRefreshToken = "valid-refresh-token";
    const decodedPayload = formatUserPayload(baseUser as any);

    it("should return new tokens when the refresh token is valid and known", async () => {
      tokenService.validateRefreshToken.mockReturnValue(decodedPayload);
      authRepository.findRefreshToken.mockResolvedValue({
        userId: baseUser.id,
        token: validRefreshToken,
      });
      tokenService.generateTokens.mockReturnValue(baseTokens);

      const result = await authService.refresh(validRefreshToken);

      expect(authRepository.saveRefreshToken).toHaveBeenCalledWith(
        decodedPayload.id,
        baseTokens.refreshToken,
      );
      expect(result).toEqual(baseTokens);
    });

    it("should throw InvalidTokenError when no refresh token is provided", async () => {
      await expect(authService.refresh("")).rejects.toThrow(InvalidTokenError);

      expect(tokenService.validateRefreshToken).not.toHaveBeenCalled();
    });

    it("should throw UnauthorizedError when the token fails signature validation", async () => {
      tokenService.validateRefreshToken.mockReturnValue(null);
      authRepository.findRefreshToken.mockResolvedValue({
        userId: baseUser.id,
        token: validRefreshToken,
      });

      await expect(authService.refresh(validRefreshToken)).rejects.toThrow(
        UnauthorizedError,
      );

      expect(tokenService.generateTokens).not.toHaveBeenCalled();
    });

    it("should throw UnauthorizedError when the token is not found in the database (revoked/reused)", async () => {
      tokenService.validateRefreshToken.mockReturnValue(decodedPayload);
      authRepository.findRefreshToken.mockResolvedValue(null);

      await expect(authService.refresh(validRefreshToken)).rejects.toThrow(
        UnauthorizedError,
      );

      expect(tokenService.generateTokens).not.toHaveBeenCalled();
    });
  });

  describe("signOut", () => {
    it("should remove the refresh token", async () => {
      authRepository.removeRefreshToken.mockResolvedValue(undefined);

      await authService.signOut("some-refresh-token");

      expect(authRepository.removeRefreshToken).toHaveBeenCalledWith(
        "some-refresh-token",
      );
    });
  });

  describe("activate", () => {
    it("should delegate activation to the repository", async () => {
      const activationDto = { link: "activation-link" } as any;
      authRepository.activateUser.mockResolvedValue(undefined);

      await authService.activate(activationDto);

      expect(authRepository.activateUser).toHaveBeenCalledWith(activationDto);
    });
  });
});
