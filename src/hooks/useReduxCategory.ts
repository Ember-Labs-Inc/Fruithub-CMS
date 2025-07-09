// hooks/useReduxCategories.ts
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useCallback } from "react";
import { loadCategories } from "../redux/slices/categorySlice";

export function useReduxCategories() {
  const dispatch = useAppDispatch();
  const { categories, status, error } = useAppSelector((state) => state.category);

  const reload = useCallback(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  useEffect(() => {
    if (status === "idle") {
      reload();
    }
  }, [status, reload]);

  const loading = status === "loading";

  return {
    categories,
    loading,
    error,
    reload,
    status,
  };
}
