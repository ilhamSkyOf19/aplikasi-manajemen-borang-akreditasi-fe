import { useEffect } from "react";

type UseClickOutsideProps = {
  refs: Array<React.RefObject<HTMLElement | null>>;
  onOutsideClick: () => void;
};

const useClickOutside = ({ refs, onOutsideClick }: UseClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target as Node),
      );

      if (isOutside) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, onOutsideClick]);
};

export default useClickOutside;
