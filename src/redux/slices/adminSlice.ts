// store/adminSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import StorageParams from "../../constants/StorageParams";

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  password?: string;
  phone?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminState {
  admins: Admin[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AdminState = {
  admins: [],
  status: "idle",
  error: null,
};

export const loadAdmins = createAsyncThunk(
  "admins/load",
  async (_, { rejectWithValue }) => {
    try {
      const cached = localStorage.getItem(StorageParams.CACHED_ADMINS);
      const cachedParsed: Admin[] = cached ? JSON.parse(cached) : [];

      const res = await api.get("/admins");
      const latest: Admin[] = res.data;

      if (JSON.stringify(cachedParsed) !== JSON.stringify(latest)) {
        localStorage.setItem(StorageParams.CACHED_ADMINS, JSON.stringify(latest));
        return latest;
      }

      return cachedParsed;
    } catch (err) {
      return rejectWithValue("Failed to load admins.");
    }
  }
);

export const addAdmin = createAsyncThunk(
  "admins/add",
  async (admin: Partial<Admin>, { rejectWithValue }) => {
    try {
      const res = await api.post("/admins", admin);
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to add admin.");
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "admins/update",
  async ({ id, updates }: { id: string; updates: Partial<Admin> }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/admins/${id}`, updates);
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to update admin.");
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  "admins/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/admins/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue("Failed to delete admin.");
    }
  }
);

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    clearAdminCache: (state) => {
      localStorage.removeItem(StorageParams.CACHED_ADMINS);
      state.admins = [];
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadAdmins.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadAdmins.fulfilled, (state, action: PayloadAction<Admin[]>) => {
        state.status = "succeeded";
        state.admins = action.payload;
      })
      .addCase(loadAdmins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(addAdmin.fulfilled, (state, action: PayloadAction<Admin>) => {
        state.admins.push(action.payload);
      })
      .addCase(updateAdmin.fulfilled, (state, action: PayloadAction<Admin>) => {
        const index = state.admins.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.admins[index] = action.payload;
        }
      })
      .addCase(deleteAdmin.fulfilled, (state, action: PayloadAction<string>) => {
        state.admins = state.admins.filter((a) => a.id !== action.payload);
      });
  },
});

export const { clearAdminCache } = adminSlice.actions;

export default adminSlice.reducer;
