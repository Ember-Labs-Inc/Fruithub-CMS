// hooks/useProducts.ts

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useCallback } from "react";
import { loadProducts } from "@/store/productSlice";

export function useReduxProducts({ includeArchived = false } = {}) {
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector((state) => state.products);

  const reload = useCallback(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  useEffect(() => {
    if (status === "idle") {
      reload();
    }
  }, [status, reload]);

  const loading = status === "loading";

  const filteredProducts = includeArchived
    ? products
    : products.filter((p) => !p.isDeleted && p.status !== "archived");

  return {
    products: filteredProducts,
    loading,
    error,
    reload,
    status,
  };
}
