type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string | null;
  email: string;
  password: string;
  activationLink: string;
  isActivated: boolean;
  roleId: number;
};

export type FormattedUser = Omit<
  User,
  | "createdAt"
  | "updatedAt"
  | "firstName"
  | "lastName"
  | "activationLink"
  | "roleId"
  | "isActivated"
  | "password"
> & {
  first_name: string;
  last_name: string;
  role: string;
  is_activated: boolean;
  created_at: Date;
  updated_at: Date;
};

export type FormattedUserPayload = Omit<
  User,
  | "createdAt"
  | "updatedAt"
  | "firstName"
  | "lastName"
  | "activationLink"
  | "roleId"
  | "isActivated"
  | "password"
> & {
  is_activated: boolean;
  role: string;
};
