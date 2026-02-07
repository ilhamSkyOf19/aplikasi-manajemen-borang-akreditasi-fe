import { useEffect, useRef, useState } from "react";

const useHasScroll = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const [hasScroll, setHasScroll] = useState<boolean>(false);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    const check = () => setHasScroll(el.scrollHeight > el.clientHeight);

    const observer = new ResizeObserver(check);

    observer.observe(el);
    check(); // initial check

    return () => observer.disconnect();
  }, []);

  return { divRef, hasScroll };
};

export default useHasScroll;
