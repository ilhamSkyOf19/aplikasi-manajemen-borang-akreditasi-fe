import type { MetaType, TypeNotifikasi } from "../types/constanst.type";

export interface INotifikasi {
  id: number;
  recipient: number;
  type: TypeNotifikasi;
  title: string;
  message: string;
  isRead: boolean;
  picId?: number;
  kebutuhanDokumen?: string;
  kriteria?: string;
  createdAt: Date;
  updatedAt: Date;
}

// response
export interface ResponseNotifikasiType extends INotifikasi {}

// response with meta
export interface ResponseNotifikasiWithMetaType {
  data: INotifikasi[];
  meta: MetaType;
}
