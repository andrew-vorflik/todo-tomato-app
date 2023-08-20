import { useEffect, useState } from "react";

type TUseDebounce = (value: string, delay?: number) => string;

type TTimeoutId = ReturnType<typeof setTimeout>;

export const useDebouncedValue: TUseDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId: TTimeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
};
