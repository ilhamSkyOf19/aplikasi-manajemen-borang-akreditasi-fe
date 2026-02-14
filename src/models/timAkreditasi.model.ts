import type { MetaType } from "../types/constanst.type";
import type { PayloadUserType } from "./user.model";

export interface ITimAkreditasi {
  id: number;
  namaTimAkreditasi: string;
  user: PayloadUserType[];
  createdAt: Date;
  updatedAt: Date;
}

// create
export interface CreateTimAkreditasiType {
  namaTimAkreditasi: string;
  users: number[];
}

// update
export interface UpdateTimAkreditasiType extends Partial<CreateTimAkreditasiType> {}

// response
export interface ResponseTimAkreditasiType extends ITimAkreditasi {}

// response with meta
export interface ResponseTimAkreditasiWithMetaType {
  data: ResponseTimAkreditasiType[];
  meta: MetaType;
}
