import { useEffect, useRef, useState } from "react";
import type { FieldValues, UseControllerReturn } from "react-hook-form";

const useFieldChooseWithSearch = <T extends FieldValues>(
  controller: UseControllerReturn<T>,
  setPage?: (page: string) => void,
) => {
  // field
  const { field, fieldState } = controller;

  // state show list
  const [showList, setShowList] = useState<boolean>(false);

  // state list position
  const [listPosition, setListPosition] = useState<
    "top" | "bottom" | undefined
  >(undefined);

  // ref list
  const listRef = useRef<HTMLDivElement | null>(null);
  // ref button
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle toggle with position calculation
  const handleToggle = () => {
    if (!showList && buttonRef.current) {
      // Calculate position BEFORE showing
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // height of list
      const listHeight = 340;

      if (spaceBelow < listHeight && spaceAbove > spaceBelow) {
        setListPosition("top");
      } else {
        setListPosition("bottom");
      }
    }

    setShowList(!showList);
  };

  //   handle next page
  const handleNextPage = (page: number, totalPage: number) => {
    if (setPage) {
      if (page < totalPage) {
        setPage((page + 1).toString());
      }
    }
  };

  // handle prev page
  const handlePrevPage = (page: number) => {
    if (setPage) {
      if (page > 1) {
        setPage((page - 1).toString());
      }
    }
  };

  return {
    field,
    fieldState,
    showList,
    setShowList,
    listPosition,
    setListPosition,
    listRef,
    buttonRef,
    handleToggle,
    handleNextPage,
    handlePrevPage,
  };
};

export default useFieldChooseWithSearch;
