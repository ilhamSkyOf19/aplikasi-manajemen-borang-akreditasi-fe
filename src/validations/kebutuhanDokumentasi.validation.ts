import z from "zod";
import type {
  CreateKebutuhanDokumenType,
  UpdateKebutuhanDokumenType,
} from "../models/kebutuhanDokumentasi.model";

export class KebutuhanDokumenValidation {
  // schema
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

  //   number schema
  private static onlyNumberSchema(
    field: string,
    min: number = 1,
    max: number = 100,
  ) {
    return z
      .number(`${field} harus berupa number`)
      .min(min, `${field} minimal ${min}`)
      .max(max, `${field} maksimal ${max}`);
  }

  //   create
  static readonly CREATE = z
    .object({
      namaDokumen: this.stringSchema("kebutuhanDokumen", 1, 200),
      keterangan: this.stringSchema("keterangan", 1, 1000),
      kriteriaId: this.onlyNumberSchema("kriteria", 1, 99999),
      pendekatanId: this.onlyNumberSchema("pendekatan", 1, 99999),
    })
    .strict() satisfies z.ZodType<CreateKebutuhanDokumenType>;

  //   update
  static readonly UPDATE = z
    .object({
      namaDokumen: this.stringUpdateSchema(
        "kebutuhanDokumen",
        1,
        200,
      ).optional(),
      keterangan: this.stringUpdateSchema("keterangan", 1, 1000).optional(),
      kriteriaId: this.onlyNumberSchema("kriteria", 1, 99999).optional(),
      pendekatanId: this.onlyNumberSchema("pendekatan", 1, 99999).optional(),
    })
    .strict() satisfies z.ZodType<UpdateKebutuhanDokumenType>;
}
