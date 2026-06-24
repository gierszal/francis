export const signUpResponseSchema = {
  type: "object",
  properties: {
    userId: {
      type: "string",
      format: "uuid",
      description: "ID нового пользователя",
    },
    firstName: { type: "string", description: "Имя пользователя" },
    email: {
      type: "string",
      format: "email",
      description: "Электронная почта",
    },
  },
  required: ["userId", "firstName", "email"],
  additionalProperties: false,
};

export const signInResponseSchema = {
  type: "object",
  properties: {
    accessToken: {
      type: "string",
      description: "JWT‑access‑token",
    },
    refreshToken: {
      type: "string",
      description: "JWT‑refresh‑token",
    },
  },
  required: ["accessToken", "refreshToken"],
  additionalProperties: false,
};

export const activateResponseSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "Account successfully activated",
      description: "Account activated successfully!",
    },
  },
  required: ["message"],
  additionalProperties: false,
};

export const emptyResponseSchema = { type: "null" };

export const refreshResponseSchema = {
  type: "object",
  properties: {
    accessToken: { type: "string", description: "JWT-access token." },
    refreshToken: { type: "string", description: "JWT-refresh token." },
  },
  required: ["accessToken", "refreshToken"],
  additionalProperties: false,
};
