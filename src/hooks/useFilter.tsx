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

  // raw filter
  const rawFilter = (searchParams.get(paramName) ?? "").toLowerCase();

  // check whitelist
  const isWhitelistActive = allowQuery && allowQuery.length > 0;

  // check filter
  const filter = isWhitelistActive
    ? allowQuery.includes(rawFilter)
      ? rawFilter
      : ""
    : rawFilter;

  // set filter
  const setFilter = (val: string) => {
    // convert to lowercase
    const valLower = val.toLowerCase();

    // check whitelist
    if (isWhitelistActive && !allowQuery.includes(valLower)) return;

    const params = new URLSearchParams(searchParams);

    // check "semua"
    if (valLower === "semua") {
      params.delete(paramName);
    } else {
      params.set(paramName, valLower);
    }

    setSearchParams(params);
  };

  return { filter, setFilter };
};
