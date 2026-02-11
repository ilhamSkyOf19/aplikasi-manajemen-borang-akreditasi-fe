import instanceAxios from "../libs/axios";
import type { ResponseUserWithMetaType } from "../models/user.model";
import type { UserRole } from "../types/constanst.type";
import type { PaginationType } from "../types/pagination.type";
import type { ResponseStructure } from "../types/response";

export class UserService {
  // login
  static async read(
    query: PaginationType & { role?: UserRole },
  ): Promise<ResponseStructure<ResponseUserWithMetaType | null>> {
    const result = await instanceAxios.get<ResponseStructure<null>>(
      "/user/read-all",
      { params: query },
    );

    return result.data;
  }
}
