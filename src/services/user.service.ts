import instanceAxios from "../libs/axios";
import type { ResponseUserWithMetaType } from "../models/user.model";
import type { PaginationType } from "../types/pagination.type";
import type { ResponseStructure } from "../types/response";

export class UserService {
  // read
  static async read(
    query: PaginationType & { role?: string },
  ): Promise<ResponseStructure<ResponseUserWithMetaType | null>> {
    const result = await instanceAxios.get<ResponseStructure<null>>(
      "/user/read-all",
      { params: query },
    );

    return result.data;
  }

  // read by id
  // static async readById(id: number): Promise<ResponseStructure<>> {
  //   const result = await instanceAxios.get<ResponseStructure<null>>(
  //     `/user/read-by-id/${id}`,
  //   );

  //   return result.data;
  // }
}
