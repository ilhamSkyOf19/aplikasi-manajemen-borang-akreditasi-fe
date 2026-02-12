import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type FilterTypeReturn = {
  filter: string;
  setFilter: (val: string) => void;
};

export const useFilter = (
  paramName: string,
  allowQuery: string[] = [],
): FilterTypeReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawFilter = (searchParams.get(paramName) ?? "").toLowerCase();

  const filter = allowQuery.includes(rawFilter) ? rawFilter : "";

  const setFilter = (val: string) => {
    const valLower = val.toLowerCase();

    if (!allowQuery.includes(valLower)) return;

    const params = new URLSearchParams(searchParams);

    if (valLower === "semua") {
      params.delete(paramName);
    } else {
      params.set(paramName, valLower);
    }

    setSearchParams(params);
  };

  // perbaiki URL saat mount
  useEffect(() => {
    if (rawFilter && !allowQuery.includes(rawFilter)) {
      const params = new URLSearchParams(searchParams);
      params.delete(paramName);
      setSearchParams(params);
    }
  }, []);

  return { filter, setFilter };
};
