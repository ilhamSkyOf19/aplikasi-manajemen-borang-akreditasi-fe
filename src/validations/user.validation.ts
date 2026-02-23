import z from "zod";
import type {
  CreateUserType,
  LoginUserType,
  UpdateUserType,
} from "../models/user.model";
import type { UserRole } from "../types/constanst.type";

export class UserValidation {
  // only char schema
  private static onlyCharSchema(
    field: string,
    min: number = 1,
    max: number = 100,
  ) {
    return z
      .string(`${field} harus berupa karakter`)
      .trim()
      .min(min, `${field} minimal ${min} karakter`)
      .max(max, `${field} maksimal ${max} karakter`)
      .regex(/^[A-Za-z\s]+$/, `${field} hanya boleh berisi huruf`);
  }

  // only char schema update
  private static onlyCharUpdateSchema(
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
          if (!val) return true; // kalau undefined → lolos
          if (val.length < min) return false;
          if (val.length > max) return false;
          if (!/^[A-Za-z\s]+$/.test(val)) return false;
          return true;
        },
        {
          message: `${field} minimal ${min} karakter dan hanya boleh huruf`,
        },
      );
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
      .min(min, `${field} harus di isi`)
      .max(max, `${field} maksimal ${max} karakter`);
  }

  // email schema
  private static emailSchema() {
    return z.email(`Email tidak valid`);
  }

  private static emailUpdateSchema() {
    return z
      .string()
      .trim()
      .transform((val) => (val === "" ? undefined : val))
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          return z.string().email().safeParse(val).success;
        },
        {
          message: "Email tidak valid",
        },
      );
  }

  // password schema
  private static passwordSchema(
    field: string = "Password",
    min: number = 1,
    max: number = 50,
  ) {
    return z
      .string(`Password harus berupa karakter`)
      .trim()
      .min(min, `${field} minimal ${min} karakter`)
      .max(max, `${field} maksimal ${max} karakter`);
  }

  // create user schema
  static readonly CREATE = z
    .object({
      nama: this.onlyCharSchema("Nama"),
      email: this.emailSchema(),
      password: this.passwordSchema("Password", 6, 50),
      confirmPassword: this.passwordSchema("Confirm Password", 6, 50),
      role: z.enum(
        ["kaprodi", "tim_akreditasi"] as Exclude<UserRole, "wakil_dekan_1">[],
        "Role KAPRODI atau TIM AKREDITASI",
      ),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        // error untuk field password
        ctx.addIssue({
          code: "custom",
          message: "password tidak sama",
          path: ["password"],
        });

        // error untuk field confirmPassword
        ctx.addIssue({
          code: "custom",
          message: "password tidak sama",
          path: ["confirmPassword"],
        });
      }
    })

    .strict() satisfies z.ZodType<CreateUserType>;

  // login
  static readonly LOGIN = z
    .object({
      identifier: this.stringSchema("identifier"),
      password: this.passwordSchema(),
    })
    .strict() satisfies z.ZodType<LoginUserType>;

  // update
  static readonly UPDATE = z
    .object({
      nama: this.onlyCharUpdateSchema("Nama").optional(),
      email: this.emailUpdateSchema().optional(),
      password: this.passwordSchema().optional(),
      role: z
        .enum(
          ["kaprodi", "tim_akreditasi"] as Exclude<UserRole, "wakil_dekan_1">[],
          "Role KAPRODI atau TIM AKREDITASI",
        )
        .optional(),
    })
    .strict() satisfies z.ZodType<UpdateUserType>;
}
