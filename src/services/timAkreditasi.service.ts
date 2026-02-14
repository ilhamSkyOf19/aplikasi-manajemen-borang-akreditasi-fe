import instanceAxios from "../libs/axios";
import type { UpdateKriteriaType } from "../models/kriteria.model";
import type {
  CreateTimAkreditasiType,
  ResponseTimAkreditasiType,
  ResponseTimAkreditasiWithMetaType,
} from "../models/timAkreditasi.model";
import type { PaginationType } from "../types/pagination.type";
import type { ResponseStructure } from "../types/response";

export class TimAkreditasiService {
  // create
  static async create(
    data: CreateTimAkreditasiType,
  ): Promise<ResponseStructure<ResponseTimAkreditasiType | null>> {
    // call api
    const result = await instanceAxios.post<
      ResponseStructure<ResponseTimAkreditasiType | null>
    >("/tim-akreditasi/create", data);

    return result.data;
  }

  //   read by id
  static async readById(
    id: number,
  ): Promise<ResponseStructure<ResponseTimAkreditasiType | null>> {
    const result = await instanceAxios.get<ResponseStructure<null>>(
      `/tim-akreditasi/read-by-id/${id}`,
    );

    return result.data;
  }

  // read all
  static async readAll(
    query: PaginationType,
  ): Promise<ResponseStructure<ResponseTimAkreditasiWithMetaType | null>> {
    const result = await instanceAxios.get<ResponseStructure<null>>(
      `/tim-akreditasi/read-all`,
      {
        params: {
          ...query,
          limit: 10,
        },
      },
    );

    return result.data;
  }

  // update
  static async update(
    id: number,
    data: UpdateKriteriaType,
  ): Promise<ResponseStructure<ResponseTimAkreditasiType | null>> {
    const result = await instanceAxios.patch<ResponseStructure<null>>(
      `/tim-akreditasi/update/${id}`,
      data,
    );

    return result.data;
  }

  //   delete
  static async delete(id: number): Promise<ResponseStructure<null>> {
    const result = await instanceAxios.delete<ResponseStructure<null>>(
      `/tim-akreditasi/delete/${id}`,
    );

    return result.data;
  }
}
