import { useSearchParams } from "react-router-dom";

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // ambil dari URL
  const urlSearch = searchParams.get("search") ?? "";

  const handleSearch = (value: string) => {
    setSearchParams({ search: value });
  };

  return {
    search: urlSearch,
    handleSearch,
  };
};
