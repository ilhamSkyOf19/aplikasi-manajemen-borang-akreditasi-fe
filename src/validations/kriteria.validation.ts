import z from "zod";
import type {
  CreateKriteriaType,
  UpdateKriteriaType,
} from "../models/kriteria.model";

export class KriteriaValidation {
  // =============================
  // NUMBER CREATE
  // =============================
  private static numberSchema(
    field: string,
    min: number = 1,
    max: number = 100,
  ) {
    return z
      .number(`${field} harus diisi`)
      .min(min, `${field} minimal ${min}`)
      .max(max, `${field} maksimal ${max}`);
  }

  // =============================
  // STRING CREATE
  // =============================
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

  // =============================
  // STRING UPDATE
  // =============================
  private static stringUpdateSchema(
    field: string,
    min: number = 1,
    max: number = 100,
  ) {
    return z
      .string()
      .trim()
      .transform((val) => (val === "" ? undefined : val))
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          if (val.length < min) return false;
          if (val.length > max) return false;
          return true;
        },
        {
          message: `${field} minimal ${min} dan maksimal ${max} karakter`,
        },
      );
  }

  // =============================
  // CREATE
  // =============================
  static readonly CREATE = z
    .object({
      kriteria: this.numberSchema("Kriteria", 1, 30),
      namaKriteria: this.stringSchema("Nama Kriteria"),
    })
    .strict() satisfies z.ZodType<CreateKriteriaType>;

  // =============================
  // UPDATE (FINAL VERSION)
  // =============================
  static readonly UPDATE = z
    .object({
      kriteria: this.numberSchema("Kriteria", 1, 30),
      namaKriteria: this.stringUpdateSchema("Nama Kriteria", 1, 100),
    })
    .strict() satisfies z.ZodType<UpdateKriteriaType>;
}
