import instanceAxios from "../libs/axios";
import type { LoginUserType, PayloadUserType } from "../models/user.model";
import type { ResponseStructure } from "../types/response";

export class AuthService {
  // login
  static async login(data: LoginUserType): Promise<ResponseStructure<null>> {
    const result = await instanceAxios
      .post<ResponseStructure<null>>("/auth/login", data)
      .then((res) => res.data);

    return result;
  }

  //   me
  static async me(): Promise<ResponseStructure<PayloadUserType | null>> {
    const result = await instanceAxios
      .get<ResponseStructure<PayloadUserType | null>>("/auth/me")
      .then((res) => res.data);

    //   return
    return result;
  }

  // logout
  static async logout(): Promise<ResponseStructure<null>> {
    const result = await instanceAxios
      .post("/auth/logout")
      .then((res) => res.data);

    return result;
  }
}
