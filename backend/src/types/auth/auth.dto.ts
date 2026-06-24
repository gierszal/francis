import {
  activationLinkSchema,
  signUpSchema,
  signInSchema,
} from "@/schemas/auth/auth.schema.js";

import { z } from "zod";

export type ActivationLinkDTO = z.infer<typeof activationLinkSchema>;
export type SignUpDTO = z.infer<typeof signUpSchema>;
export type SignInDTO = z.infer<typeof signInSchema>;
