import type { MetaType, Status } from "../types/constanst.type";
import type { ResponseKriteriaType } from "./kriteria.model";
import type { IPendekatan } from "./pendekatan.model";

export interface IKebutuhanDokumen {
  id: number;
  namaDokumen: string;
  keterangan: string;
  kriteria: Omit<ResponseKriteriaType, "revisi" | "createdAt" | "updatedAt">;
  pendekatan: IPendekatan;
  //   pic: [];
  createdAt: Date;
  updatedAt: Date;
  status: Status;
}

// create
export interface CreateKebutuhanDokumenType extends Omit<
  IKebutuhanDokumen,
  | "id"
  | "pic"
  | "kriteria"
  | "pendekatan"
  | "createdAt"
  | "updatedAt"
  | "statsus"
> {
  kriteriaId: number;
  pendekatanId: number;
}

// update
export interface UpdateKebutuhanDokumenType extends Partial<CreateKebutuhanDokumenType> {
  status?: Status;
}

// response
export interface ResponseKebutuhanDokumenType extends IKebutuhanDokumen {}

// to response
export const toResponseKebutuhanDokumenType = (
  kebutuhanDokumen: ResponseKebutuhanDokumenType,
): ResponseKebutuhanDokumenType => kebutuhanDokumen;

// response with pagination
export interface ResponseKebutuhanDokumenWithMetaType {
  meta: MetaType;
  data: ResponseKebutuhanDokumenType[];
}

// to response with pagination
export const toResponseKebutuhanDokumenWithMetaType = (
  kebutuhanDokumen: ResponseKebutuhanDokumenWithMetaType,
): ResponseKebutuhanDokumenWithMetaType => kebutuhanDokumen;
