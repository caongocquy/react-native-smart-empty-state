import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  UseAsyncStateOptions,
  UseAsyncStateResult,
} from '../types';

export function useAsyncState<T, Args extends unknown[] = []>(
  fetcher: (...args: Args) => Promise<T>,
  options: UseAsyncStateOptions<T> = {}
): UseAsyncStateResult<T, Args> {
  const { immediate = false, initialData } = options;
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(undefined);
  const fetcherRef = useRef(fetcher);
  const optionsRef = useRef(options);
  const hasRunImmediateRef = useRef(false);
  const mountedRef = useRef(true);

  fetcherRef.current = fetcher;
  optionsRef.current = options;

  const execute = useCallback(
    async (...args: Args) => {
      setLoading(true);
      setError(undefined);

      try {
        const nextData = await fetcherRef.current(...args);

        if (mountedRef.current) {
          setData(nextData);
          optionsRef.current.onSuccess?.(nextData);
        }

        return nextData;
      } catch (nextError) {
        if (mountedRef.current) {
          setError(nextError);
          optionsRef.current.onError?.(nextError);
        }

        throw nextError;
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    },
    []
  );

  const reset = useCallback(() => {
    setData(optionsRef.current.initialData);
    setError(undefined);
    setLoading(false);
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (immediate && !hasRunImmediateRef.current) {
      hasRunImmediateRef.current = true;
      void execute(...([] as unknown as Args));
    }
  }, [execute, immediate]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    setData,
  };
}
