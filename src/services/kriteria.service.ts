import instanceAxios from "../libs/axios";
import type {
  CreateKriteriaType,
  ResponseKriteriaType,
  ResponseKriteriaWithMetaType,
  UpdateKriteriaType,
} from "../models/kriteria.model";
import type { PaginationType } from "../types/pagination.type";
import type { ResponseStructure } from "../types/response";

export class KriteriaService {
  // create
  static async create(
    data: CreateKriteriaType,
  ): Promise<ResponseStructure<ResponseKriteriaType | null>> {
    // call api
    const result = await instanceAxios.post<
      ResponseStructure<ResponseKriteriaType | null>
    >("/kriteria/create", data);

    return result.data;
  }

  // read by id
  static async readById(
    id: number,
  ): Promise<ResponseStructure<ResponseKriteriaType | null>> {
    // call api
    const result = await instanceAxios.get<
      ResponseStructure<ResponseKriteriaType | null>
    >(`/kriteria/read-by-id/${id}`);

    return result.data;
  }

  // read all with pagination
  static async readAll(
    query: PaginationType & {
      status?: "baru" | "revisi";
    },
  ): Promise<ResponseStructure<ResponseKriteriaWithMetaType | null>> {
    // call api
    const result = await instanceAxios.get<
      ResponseStructure<ResponseKriteriaWithMetaType | null>
    >(`/kriteria/read-all`, { params: query });

    return result.data;
  }

  // update
  static async update(
    id: number,
    data: UpdateKriteriaType,
  ): Promise<ResponseStructure<ResponseKriteriaType | null>> {
    // call api
    const result = await instanceAxios.patch<
      ResponseStructure<ResponseKriteriaType | null>
    >(`/kriteria/update/${id}`, data);

    return result.data;
  }

  // delete
  static async delete(
    id: number,
  ): Promise<ResponseStructure<ResponseKriteriaType | null>> {
    // call api
    const result = await instanceAxios.delete<
      ResponseStructure<ResponseKriteriaType | null>
    >(`/kriteria/delete/${id}`);

    return result.data;
  }
}
