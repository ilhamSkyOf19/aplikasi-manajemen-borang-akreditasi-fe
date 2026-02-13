import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type FilterTypeReturn = {
  filter: string;
  setFilter: (val: string) => void;
};

export const useFilter = (
  paramName: string,
  allowQuery?: string[],
): FilterTypeReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawFilter = (searchParams.get(paramName) ?? "").toLowerCase();

  // ✅ hanya validasi kalau allowQuery ada & tidak kosong
  const isWhitelistActive = allowQuery && allowQuery.length > 0;

  const filter = isWhitelistActive
    ? allowQuery.includes(rawFilter)
      ? rawFilter
      : ""
    : rawFilter;

  const setFilter = (val: string) => {
    const valLower = val.toLowerCase();

    // ✅ validasi hanya jika whitelist aktif
    if (isWhitelistActive && !allowQuery.includes(valLower)) return;

    const params = new URLSearchParams(searchParams);

    if (valLower === "semua") {
      params.delete(paramName);
    } else {
      params.set(paramName, valLower);
    }

    setSearchParams(params);
  };

  // ✅ perbaiki URL saat mount hanya jika whitelist aktif
  useEffect(() => {
    if (isWhitelistActive && rawFilter && !allowQuery.includes(rawFilter)) {
      const params = new URLSearchParams(searchParams);
      params.delete(paramName);
      setSearchParams(params);
    }
  }, []);

  return { filter, setFilter };
};
