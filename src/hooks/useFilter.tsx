import { useSearchParams } from "react-router-dom";

type FilterTypeReturn = {
  filter: string;
  setFilter: (val: string) => void;
};
export const useFilter = (paramName: string): FilterTypeReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get(paramName) ?? "";

  const setFilter = (val: string) => {
    const valLower = val.toLowerCase();

    const params = new URLSearchParams(searchParams);

    valLower && valLower !== "semua"
      ? params.set(paramName, valLower)
      : valLower === "semua"
        ? params.set(paramName, "")
        : params.delete(paramName);

    setSearchParams(params);
  };

  return { filter, setFilter };
};
