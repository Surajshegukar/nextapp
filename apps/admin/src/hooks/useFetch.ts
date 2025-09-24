import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface UseFetchProps<T> {
  fetchService: () => Promise<T>;
  onError?: (error: string) => void;
}

export function useFetch<T>({
  fetchService,
  onError,
}: UseFetchProps<T>) {

  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchService();
        setData(data);
      } catch (error: any) {
        onError?.(error.message || "Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  return { data };
}
