import type { User } from "@/generated/prisma/client.js";

export class UserPayloadDTO {
  email;
  id;
  isActivated;
  roleId;
  constructor(model: User) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
    this.roleId = model.roleId;
  }
}

export class UserCreateDTO {
  firstName: string;
  email: string;
  password: string;
  link: string;
  constructor(model: User) {
    this.firstName = model.firstName;
    this.email = model.email;
    this.password = model.password;
    this.link = model.activationLink;
  }
}

export class ProtectedUserDTO {
  id;
  firstName;
  lastName;
  email;
  activationLink;
  isActivated;
  createdAt;
  updatedAt;
  roleId;
  constructor(model: User) {
    this.email = model.email;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.activationLink = model.activationLink;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.id = model.id;
    this.isActivated = model.isActivated;
    this.roleId = model.roleId;
  }
}
