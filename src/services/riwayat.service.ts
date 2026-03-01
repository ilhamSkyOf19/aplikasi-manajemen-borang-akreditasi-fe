import instanceAxios from "../libs/axios";
import type { ResponsePicType } from "../models/pic.model";
import type { ResponseRiwayatType } from "../models/riwayat.model";
import type { UpdateStatusType } from "../types/constanst.type";
import type { ResponseStructure } from "../types/response";

export class RiwayatService {
  // read all by id
  static async readAllByPicId(
    id: number,
  ): Promise<ResponseStructure<ResponseRiwayatType[] | null>> {
    // call api
    const result = await instanceAxios.get<
      ResponseStructure<ResponseRiwayatType[] | null>
    >(`/riwayat/read-all-by-pic-id/${id}`);

    return result.data;
  }

  // update status
  static async updateStatus(
    id: number,
    data: UpdateStatusType,
  ): Promise<ResponseStructure<ResponsePicType | null>> {
    const result = await instanceAxios.patch<
      ResponseStructure<ResponsePicType | null>
    >(`/riwayat/update-status/${id}`, data);
    return result.data;
  }
}
