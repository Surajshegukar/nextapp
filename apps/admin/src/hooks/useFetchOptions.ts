import { useEffect, useState } from "react";

interface UseFetchOptions<T> {
  fetchService: () => Promise<T[]>;
  mapLabel: (item: T) => string; // how to extract label
  mapValue: (item: T) => string | number; // how to extract value
  onError?: (error: string) => void;
}

interface LabeledValue {
  label: string;
  value: string | number;
}

export function useLabeledOptions<T>({
  fetchService,
  mapLabel,
  mapValue,
  onError,
}: UseFetchOptions<T>) {
  const [options, setOptions] = useState<LabeledValue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchService();
        const mapped = result.map((item) => ({
          label: mapLabel(item),
          value: mapValue(item),
        }));
        setOptions(mapped);
      } catch (err: any) {
        const message = err?.message || "Failed to fetch data";
        setError(message);
        onError?.(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchService, mapLabel, mapValue, onError]);

  return { options, loading, error };
}
