export const generatePassword = (length = 12): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
};

export const generateStatus = (
  s1?: string | null,
  s2?: string | null,
  s3?: string | null,
) => {
  const statuses = [s1, s2, s3].filter(Boolean); // buang null/undefined

  console.log(statuses);

  if (statuses.includes("revisi")) return "revisi";
  if (statuses.includes("menunggu")) return "menunggu";
  return "disetujui";
};
