import { useCallback, useRef, useState } from "react";

export function useUniqueCheck<
  T extends (value: string, id?: number) => Promise<any>
>(serviceFn: T, delay = 500) {
  const [isUnique, setIsUnique] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const checkUnique = useCallback(
    (value: string, id?: number) => {
      if (!value?.trim()) {
        setIsUnique(null);
        setError(null);
        setLoading(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        return;
      }

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await serviceFn(value, id);
          setIsUnique(res?.data?.isUnique ?? res?.isUnique ?? false);

        } catch (err: any) {
          setError(err?.message || "Failed to validate uniqueness");
          setIsUnique(null);
        } finally {
          setLoading(false);
          
        }
      }, delay);
    },
    [serviceFn, delay]
  );

  return { isUnique, loading, error, checkUnique };
}
