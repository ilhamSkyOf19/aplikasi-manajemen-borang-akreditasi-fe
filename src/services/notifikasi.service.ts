import instanceAxios from "../libs/axios";
import type {
  ResponseNotifikasiType,
  ResponseNotifikasiWithMetaType,
} from "../models/notifikasi.model";
import type { PaginationType } from "../types/pagination.type";
import type { ResponseStructure } from "../types/response";

export class NotifikasiService {
  // create
  static async readAll(
    query: PaginationType & { isRead?: string },
  ): Promise<ResponseStructure<ResponseNotifikasiWithMetaType | null>> {
    // call api
    const result = await instanceAxios.get<
      ResponseStructure<ResponseNotifikasiWithMetaType | null>
    >(`/notifikasi/read-all`, { params: query });
    return result.data;
  }

  // is read
  static async isRead(
    id: number,
  ): Promise<ResponseStructure<ResponseNotifikasiType | null>> {
    // call api
    const result = await instanceAxios.put<
      ResponseStructure<ResponseNotifikasiType | null>
    >(`/notifikasi/isRead/${id}`);

    return result.data;
  }
}
