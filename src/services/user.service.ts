import instanceAxios from "../libs/axios";
import type {
  CreateUserType,
  PayloadUserType,
  ResponseUserWithMetaType,
  UpdateUserType,
} from "../models/user.model";
import type { PaginationType } from "../types/pagination.type";
import type { ResponseStructure } from "../types/response";

export class UserService {
  // read
  static async read(
    query: PaginationType & { role?: string },
  ): Promise<ResponseStructure<ResponseUserWithMetaType | null>> {
    const result = await instanceAxios.get<ResponseStructure<null>>(
      "/user/read-all",
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
  ): Promise<ResponseStructure<PayloadUserType | null>> {
    const result = await instanceAxios.get<ResponseStructure<null>>(
      `/user/read-by-id/${id}`,
    );

    return result.data;
  }

  // create user
  static async create(
    req: CreateUserType,
  ): Promise<ResponseStructure<PayloadUserType | null>> {
    const result = await instanceAxios.post<ResponseStructure<null>>(
      "/auth/register",
      req,
    );
    return result.data;
  }

  // update
  static async update(
    id: number,
    req: UpdateUserType,
  ): Promise<ResponseStructure<PayloadUserType | null>> {
    const result = await instanceAxios.patch<ResponseStructure<null>>(
      `/user/update/${id}`,
      req,
    );
    return result.data;
  }

  // delete
  static async delete(
    id: number,
  ): Promise<ResponseStructure<PayloadUserType | null>> {
    const result = await instanceAxios.delete<ResponseStructure<null>>(
      `/user/delete/${id}`,
    );
    return result.data;
  }
}
