import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string().max(100, "Name is sooo long!"),
  lastName: z.string().max(100, "Last name is sooo long!"),
  email: z.email("The email is not valid!").max(100, "Name is sooo long!"),
});

export const updateUserSchema = createUserSchema.partial();
