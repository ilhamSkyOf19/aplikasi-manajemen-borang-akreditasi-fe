import type { MetaType, Status } from "../types/constanst.type";
import type { IKebutuhanDokumen } from "./kebutuhanDokumentasi.model";
import type { ITimAkreditasi } from "./timAkreditasi.model";
import type { PayloadUserType } from "./user.model";

// type
export interface IPic {
  id: number;
  timAkreditasi: Omit<ITimAkreditasi, "user">;
  kebutuhanDokumen: Omit<IKebutuhanDokumen, "createdAt" | "updatedAt">;
  pj: PayloadUserType[];
  status: Status;
  keterangan: string;
  createdAt: Date;
  updatedAt: Date;
}

// create
export interface CreatePicType {
  timAkreditasiId: number;
  kebutuhanDokumenId: number;
  pjId: number[];
  keterangan: string;
}

// update
export interface UpdatePicType extends Partial<Omit<CreatePicType, "status">> {}

// response
export interface ResponsePicType extends IPic {}

// to response
export const toResponsePicType = (pic: ResponsePicType): ResponsePicType => pic;

// response with pagination
export interface ResponsePicWithMetaType {
  meta: MetaType;
  data: ResponsePicType[];
}

// to response with pagination
export const toResponsePicWithMetaType = (
  pic: ResponsePicWithMetaType,
): ResponsePicWithMetaType => pic;
