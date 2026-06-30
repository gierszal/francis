import { ROLES } from "@/types/auth/auth.roles.js";
import z from "zod";
import { userSchema } from "../user/user.response.schema.js";

// const userAuthSchema = z.object({
//   id: z.uuid(),
//   email: z.email(),
//   is_activated: z.boolean(),
//   role: z.enum([ROLES.ADMIN.name, ROLES.USER.name]),
// });

const tokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const signUpSchema = z.object({
  tokens: tokensSchema,
  user: userSchema,
});

export const signUpResponseSchema = z.object({
  data: signUpSchema,
});

export const signInResponseSchema = signUpResponseSchema;

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

export const refreshResponseSchema = z.object({
  data: tokensSchema,
});
