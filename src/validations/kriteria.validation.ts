import z from "zod";
import type {
  CreateKriteriaType,
  UpdateKriteriaType,
} from "../models/kriteria.model";

export class KriteriaValidation {
  // only char schema
  private static onlyNumberSchema(
    field: string,
    min: number = 1,
    max: number = 100,
  ) {
    return z
      .number(`${field} harus di isi`)
      .min(min, `${field} harus di isi`)
      .max(max, `${field} harus di isi`);
  }

  // string schema
  private static stringSchema(
    field: string,
    min: number = 1,
    max: number = 100,
  ) {
    return z
      .string(`${field} harus berupa karakter`)
      .trim()
      .min(min, `${field} minimal ${min} karakter`)
      .max(max, `${field} maksimal ${max} karakter`);
  }

  // create user schema
  static readonly CREATE = z
    .object({
      kriteria: this.onlyNumberSchema("kriteria", 1, 30),
      namaKriteria: this.stringSchema("namaKriteria"),
    })
    .strict() satisfies z.ZodType<CreateKriteriaType>;

  // update user schema
  // update schema (optional per field)
  static readonly UPDATE = z
    .object({
      kriteria: this.onlyNumberSchema("kriteria").optional(),
      namaKriteria: this.stringSchema("namaKriteria").optional(),
    })
    .strict() satisfies z.ZodType<UpdateKriteriaType>;
}
