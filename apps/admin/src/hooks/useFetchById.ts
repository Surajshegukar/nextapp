import { useEffect } from "react";
import { useParams } from "next/navigation";

interface UseFetchByIdProps<T> {
  fetchService: (id: string) => Promise<T>;
  setFormData: (data: Partial<T>) => void;
  onError?: (error: string) => void;
}

export function useFetchById<T>({
  fetchService,
  setFormData,
  onError,
}: UseFetchByIdProps<T>) {
  const params = useParams();
  const id = params?.id as string | undefined;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await fetchService(id);
        setFormData(data);
      } catch (error: any) {
        onError?.(error.message || "Failed to fetch data");
      }
    };

    fetchData();
  }, [id]); // 👈 Only re-run if the `id` changes

  return { id };
}
