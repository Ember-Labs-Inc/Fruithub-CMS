// hooks/useReduxAdmin.ts
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useCallback } from "react";
import { loadAdmins } from "../redux/slices/adminSlice";

export function useReduxAdmin() {
  const dispatch = useAppDispatch();
  const { admins, status, error } = useAppSelector((state) => state.admin);

  const reload = useCallback(() => {
    dispatch(loadAdmins());
  }, [dispatch]);

  useEffect(() => {
    if (status === "idle") {
      reload();
    }
  }, [status, reload]);

  const loading = status === "loading";

  return {
    admins,
    loading,
    error,
    reload,
    status,
  };
}
