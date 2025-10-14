import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hook de obtención de datos con:
 * - loading, error, data
 * - refetch()
 * - AbortController automático
 *
 * @param {(signal: AbortSignal) => Promise<any>} asyncFn
 * @param {any[]} deps dependencias para volver a ejecutar
 */
export function useFetch(asyncFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refetchTick = useRef(0);
  const controllerRef = useRef(null);
  const mountedRef = useRef(true);

  const run = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const result = await asyncFn(controller.signal);
      if (!mountedRef.current || controller.signal.aborted) return;
      setData(result);
    } catch (err) {
      if (err?.name === "AbortError") return;
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      if (mountedRef.current && !controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    mountedRef.current = true;
    run();
    return () => {
      mountedRef.current = false;
      controllerRef.current?.abort();
    };
  }, [run, refetchTick.current]);

  const refetch = useCallback(() => {
    refetchTick.current += 1;
    run();
  }, [run]);

  return { data, loading, error, refetch };
}
