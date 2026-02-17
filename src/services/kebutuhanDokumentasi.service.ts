import instanceAxios from "../libs/axios";
import type {
  CreateKebutuhanDokumenType,
  ResponseKebutuhanDokumenType,
  ResponseKebutuhanDokumenWithMetaType,
} from "../models/kebutuhanDokumentasi.model";
import type { Status } from "../types/constanst.type";
import type { PaginationType } from "../types/pagination.type";
import type { ResponseStructure } from "../types/response";

export class KebutuhanDokumentasiService {
  // create
  static async create(
    data: CreateKebutuhanDokumenType,
  ): Promise<ResponseStructure<ResponseKebutuhanDokumenType | null>> {
    // call api
    const result = await instanceAxios.post<
      ResponseStructure<ResponseKebutuhanDokumenType | null>
    >("/kebutuhan-dokumen/create", data);

    return result.data;
  }

  // read by id
  static async readById(
    id: number,
  ): Promise<ResponseStructure<ResponseKebutuhanDokumenType | null>> {
    // call api
    const result = await instanceAxios.get<
      ResponseStructure<ResponseKebutuhanDokumenType | null>
    >(`/kebutuhan-dokumen/read-by-id/${id}`);

    return result.data;
  }

  // read all
  static async readAll(
    query: PaginationType & { status?: Status; kriteria?: string },
  ): Promise<ResponseStructure<ResponseKebutuhanDokumenWithMetaType | null>> {
    // call api
    const result = await instanceAxios.get<
      ResponseStructure<ResponseKebutuhanDokumenWithMetaType | null>
    >("/kebutuhan-dokumen/read-all", { params: query });

    return result.data;
  }

  //   update
  static async update(
    id: number,
    data: CreateKebutuhanDokumenType,
  ): Promise<ResponseStructure<ResponseKebutuhanDokumenType | null>> {
    const result = await instanceAxios.patch<ResponseStructure<null>>(
      `/kebutuhan-dokumen/update/${id}`,
      data,
    );
    return result.data;
  }

  //   delete
  static async delete(id: number): Promise<ResponseStructure<null>> {
    const result = await instanceAxios.delete<ResponseStructure<null>>(
      `/kebutuhan-dokumen/delete/${id}`,
    );
    return result.data;
  }
}
