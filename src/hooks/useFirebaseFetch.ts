import { useEffect, useState } from "react";

export const useFirebaseFetch = <T>(
  // TODO fix any type
  firebaseFetchFn: (...args: any[]) => void
) => {
  // TODO replace on useReducer hook
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<T[]>([]);

  const fetch = async (...args: Parameters<typeof firebaseFetchFn>) => {
    try {
      setIsLoading(true);
      const response: any = await firebaseFetchFn(...args);

      setData(response);
      setIsLoading(false);
      setError("");
    } catch (error: any) {
      setIsLoading(false);
      setError(error.name);
      setData([]);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { isLoading, error, data, fetch };
};
