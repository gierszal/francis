import type { User } from "@/generated/prisma/client.js";

export function formatUser(user: User | any) {
  return {
    id: user.id,
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    is_activated: user.isActivated,
    role: user.role.role,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  };
}

export function formatUserPayload(user: User | any) {
  return {
    id: user.id,
    email: user.email,
    is_activated: user.isActivated,
    role: user.role.role,
  };
}
