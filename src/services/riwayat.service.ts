import instanceAxios from "../libs/axios";
import type { ResponseRiwayatType } from "../models/riwayat.model";
import type { ResponseStructure } from "../types/response";

export class RiwayatService {
  // read all by pic id
  static async readAllByPicId(
    id: number,
  ): Promise<ResponseStructure<ResponseRiwayatType[] | null>> {
    // call api
    const result = await instanceAxios.get<
      ResponseStructure<ResponseRiwayatType[] | null>
    >(`/riwayat/read-all-by-pic-id/${id}`);

    return result.data;
  }
}
