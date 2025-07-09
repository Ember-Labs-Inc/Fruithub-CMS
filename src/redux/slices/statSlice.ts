// redux/slices/statSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";

export interface OrderStats {
  pending: number;
  processing: number;
  delivered: number;
  cancelled: number;
}

export interface CategoryStats {
  totalCategories: number;
  totalProducts: number;
  largestCategory: {
    name: string;
    productCount: number;
  };
  averagePerCategory: number;
}

export interface QuickStat {
  title: string;
  value: number | string;
  change: string;
  changeType: "increase" | "warning" | "neutral";
  icon: string;
}

interface StatState {
  totalCustomers: number;
  activeUsers: number;
  vipCustomers: number;
  avgCustomerValue: number;
  orderStats: OrderStats;
  categoryStats: CategoryStats;
  quickStats: QuickStat[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StatState = {
  totalCustomers: 0,
  activeUsers: 0,
  vipCustomers: 0,
  avgCustomerValue: 0,
  orderStats: { pending: 0, processing: 0, delivered: 0, cancelled: 0 },
  categoryStats: {
    totalCategories: 0,
    totalProducts: 0,
    largestCategory: { name: "", productCount: 0 },
    averagePerCategory: 0,
  },
  quickStats: [],
  status: "idle",
  error: null,
};

export const loadStats = createAsyncThunk(
  "stats/load",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/stats");
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to load statistics.");
    }
  }
);

const statSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadStats.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadStats.fulfilled, (state, action: PayloadAction<StatState>) => {
        return { ...state, ...action.payload, status: "succeeded" };
      })
      .addCase(loadStats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default statSlice.reducer;
