// hooks/useReduxStats.ts
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useCallback } from "react";
import { loadStats } from "../redux/slices/statSlice";

export function useReduxStats() {
  const dispatch = useAppDispatch();
  const stats = useAppSelector((state) => state.stat);

  const reload = useCallback(() => {
    dispatch(loadStats());
  }, [dispatch]);

  useEffect(() => {
    if (stats.status === "idle") {
      reload();
    }
  }, [stats.status, reload]);

  return {
    ...stats,
    reload,
    loading: stats.status === "loading",
  };
}
