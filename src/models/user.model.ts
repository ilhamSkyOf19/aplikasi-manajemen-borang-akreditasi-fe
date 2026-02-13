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
  "id" | "createdAt" | "updatedAt" | "tims" | "role"
> {
  confirmPassword: string;
  role: Exclude<UserRole, "wakil_dekan_1">;
}

// update user model
export interface UpdateUserType extends Partial<Omit<CreateUserType, "role">> {
  role?: Exclude<UserRole, "wakil_dekan_1">;
}

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
// response kriteria model with meta
export interface ResponseUserWithMetaType {
  meta: {
    totalData: number;
    currentPage: number;
    totalPage: number;
    limit: number;
  };
  data: ResponseUserType[];
}
