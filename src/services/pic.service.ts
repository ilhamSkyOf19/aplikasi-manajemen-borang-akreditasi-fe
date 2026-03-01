import instanceAxios from "../libs/axios";
import type {
  CreatePicType,
  ResponsePicType,
  ResponsePicWithMetaType,
  UpdatePicType,
} from "../models/pic.model";
import type { Status, UpdateStatusType } from "../types/constanst.type";
import type { PaginationType } from "../types/pagination.type";
import type { ResponseStructure } from "../types/response";

export class PicService {
  // create
  static async create(
    data: CreatePicType,
  ): Promise<ResponseStructure<ResponsePicType | null>> {
    const result = await instanceAxios.post<
      ResponseStructure<ResponsePicType | null>
    >("/pic/create", data);

    return result.data;
  }

  // read all
  static async readAll(
    query: PaginationType & {
      status?: Status;
    },
  ): Promise<ResponseStructure<ResponsePicWithMetaType | null>> {
    const result = await instanceAxios.get<ResponseStructure<null>>(
      "/pic/read-all",
      {
        params: {
          ...query,
          limit: 10,
        },
      },
    );
    return result.data;
  }

  // read by id
  static async readById(
    id: number,
  ): Promise<ResponseStructure<ResponsePicType | null>> {
    // call api
    const result = await instanceAxios.get<
      ResponseStructure<ResponsePicType | null>
    >(`/pic/read-by-id/${id}`);

    return result.data;
  }

  // update
  static async update(
    id: number,
    data: UpdatePicType,
  ): Promise<ResponseStructure<ResponsePicType | null>> {
    const result = await instanceAxios.patch<ResponseStructure<null>>(
      `/pic/update/${id}`,
      data,
    );
    return result.data;
  }

  // update status
  static async updateStatus(
    id: number,
    data: UpdateStatusType,
  ): Promise<ResponseStructure<ResponsePicType | null>> {
    const result = await instanceAxios.patch<ResponseStructure<null>>(
      `/pic/update-status-pic/${id}`,
      data,
    );
    return result.data;
  }

  // delete
  static async delete(id: number): Promise<ResponseStructure<null>> {
    // call api
    const result = await instanceAxios.delete<ResponseStructure<null>>(
      `/pic/delete/${id}`,
    );
    return result.data;
  }
}
