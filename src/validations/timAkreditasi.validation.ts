import z from "zod";
import type {
  CreateTimAkreditasiType,
  UpdateTimAkreditasiType,
} from "../models/timAkreditasi.model";

export class TimAkreditasivalidation {
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

  //   json schema
  private static numberArraySchema() {
    return z
      .array(
        z
          .number("Anggota harus di isi")
          .int("Anggota harus di isi")
          .positive("Anggota harus di isi"),
      )
      .nonempty("Anggota harus di isi");
  }

  // create
  static readonly CREATE = z
    .object({
      namaTimAkreditasi: this.stringSchema("namaTimAkreditasi"),
      users: this.numberArraySchema(),
    })
    .strict() satisfies z.ZodType<CreateTimAkreditasiType>;

  // update
  static readonly UPDATE = z
    .object({
      namaTimAkreditasi: this.stringSchema("namaTimAkreditasi").optional(),
      users: z.array(z.number().int().positive()).optional(),
    })
    .strict() satisfies z.ZodType<UpdateTimAkreditasiType>;
}
