import z from "zod";
import type {
  FlagRevisi,
  JenisRiwayat,
  Status,
  UpdateStatusType,
} from "../types/constanst.type";

export class StatusValidation {
  // string
  private static stringSchema(
    field: string,
    min: number = 1,
    max: number = 100,
  ) {
    return z
      .string(`${field} harus diisi`)
      .trim()
      .min(min, `${field} minimal ${min} karakter`)
      .max(max, `${field} maksimal ${max} karakter`);
  }
  // update status
  static readonly UPDATE_STATUS = z
    .object({
      status: z.enum(
        ["menunggu", "revisi", "disetujui"] as Status[],
        "Status tidak valid",
      ),
      keterangan: this.stringSchema("keterangan", 1, 1000),
      jenisRiwayat: z.enum(
        ["pic", "dokumen_borang"] as JenisRiwayat[],
        "Status tidak valid",
      ),
      flagRevisi: z
        .array(
          z.enum(
            ["pic", "kebutuhan_dokumen", "dokumen_borang"] as FlagRevisi[],
            "flag revisi tidak valid",
          ),
        )
        .optional(),
    })
    .strict() satisfies z.ZodType<UpdateStatusType>;
}
