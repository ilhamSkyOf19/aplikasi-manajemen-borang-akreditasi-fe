import type { FlagRevisi, JenisRiwayat, Status } from "../types/constanst.type";
import type { IKebutuhanDokumen } from "./kebutuhanDokumentasi.model";
import type { IPic } from "./pic.model";
import type { ITimAkreditasi } from "./timAkreditasi.model";
import type { PayloadUserType } from "./user.model";

export interface IRiwayat {
  id: number;
  jenis: JenisRiwayat;
  status: Status;
  flagRevisi?: FlagRevisi[] | null;
  keterangan: string;
  createdData?: Date | null;
  highlightDataEmpy?: string;
  pic?:
    | (Pick<IPic, "id" | "status"> & {
        kebutuhanDokumen: Pick<IKebutuhanDokumen, "id" | "namaDokumen">;
        timAkreditasi: Pick<ITimAkreditasi, "id" | "namaTimAkreditasi">;
        pj: Pick<PayloadUserType, "id" | "nama">[];
      })
    | null;
  createdAt: Date;
  updatedAt: Date;
}

// create
export interface CreateRiwayatType extends Omit<
  IRiwayat,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "kebutuhanDokumen"
  | "pic"
  | "highlightDataEmpy"
  | "createdData"
> {
  kebutuhanDokumenId?: number;
  picId?: number;
}

// update
export interface UpdateRiwayatType extends Partial<
  Omit<CreateRiwayatType, "kebutuhanDokumenId" | "picId">
> {
  flagRevisi?: FlagRevisi[];
}

// response
export interface ResponseRiwayatType extends IRiwayat {}
