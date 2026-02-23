import z from "zod";
import type {
  CreateTimAkreditasiType,
  UpdateTimAkreditasiType,
} from "../models/timAkreditasi.model";

export class TimAkreditasiValidation {
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
  // NUMBER ARRAY CREATE
  // =============================
  private static numberArraySchema() {
    return z
      .array(
        z
          .number("Anggota harus di isi")
          .int("Anggota harus berupa angka valid")
          .positive("Anggota harus berupa angka positif"),
      )
      .nonempty("Anggota harus di isi");
  }

  // =============================
  // NUMBER ARRAY UPDATE
  // =============================
  private static numberArrayUpdateSchema() {
    return z
      .array(
        z
          .number()
          .int("Anggota harus berupa angka valid")
          .positive("Anggota harus berupa angka positif"),
      )
      .optional()
      .refine(
        (val) => {
          if (!val) return true; // tidak dikirim → lolos
          if (val.length === 0) return false; // kalau kirim [] → error
          return true;
        },
        {
          message: "Anggota tidak boleh kosong",
        },
      );
  }

  // =============================
  // CREATE
  // =============================
  static readonly CREATE = z
    .object({
      namaTimAkreditasi: this.stringSchema("Nama Tim Akreditasi"),
      users: this.numberArraySchema(),
    })
    .strict() satisfies z.ZodType<CreateTimAkreditasiType>;

  // =============================
  // UPDATE (FINAL VERSION)
  // =============================
  static readonly UPDATE = z
    .object({
      namaTimAkreditasi: this.stringUpdateSchema("Nama Tim Akreditasi", 1, 100),
      users: this.numberArrayUpdateSchema(),
    })
    .strict() satisfies z.ZodType<UpdateTimAkreditasiType>;
}
