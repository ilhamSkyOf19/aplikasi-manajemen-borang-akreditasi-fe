import type { UserRole } from "../types/constanst.type";
import type { ITimAkreditasi } from "./timAkreditasi.model";

export interface IUser {
  id: number;
  nama: string;
  email: string;
  password: string;
  tims: Omit<ITimAkreditasi, "user">[];
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// create user model
export interface CreateUserType extends Omit<
  IUser,
  "id" | "createdAt" | "updatedAt" | "tims"
> {}

// login type
export interface LoginUserType extends Pick<IUser, "password"> {
  identifier: string;
}

// payload
export interface PayloadUserType extends Omit<
  IUser,
  "password" | "createdAt" | "updatedAt" | "tims"
> {}

// response user model
export interface ResponseUserType extends Omit<IUser, "password"> {}

// response with meta
export interface ResponseUserWithMetaType {
  data: ResponseUserType[];
  meta: HdrMetadataType;
}
