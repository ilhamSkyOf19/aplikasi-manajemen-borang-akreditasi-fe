export const splitPathname = (value: string): string[] => {
  const pathSplit: string[] = value
    .split("/")
    .map((item) => item.split("-").join(" "))
    .slice(2);

  return pathSplit;
};
