// store/categorySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import StorageParams from "../../constants/StorageParams";


export interface Category {
  id: string;
  name: string;
  image?: string;
  description?: string;
  productCount?: number;
  createdAt: string;
}


interface CategoryState {
  categories: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  status: "idle",
  error: null,
};

export const loadCategories = createAsyncThunk(
  "categories/load",
  async (_, { rejectWithValue }) => {
    try {
      const cached = localStorage.getItem(StorageParams.CACHED_CATEGORIES);
      const cachedParsed: Category[] = cached ? JSON.parse(cached) : [];

      const res = await api.get("/categories");
      const latest: Category[] = res.data;

      if (JSON.stringify(cachedParsed) !== JSON.stringify(latest)) {
        localStorage.setItem(StorageParams.CACHED_CATEGORIES, JSON.stringify(latest));
        return latest;
      }

      return cachedParsed;
    } catch {
      return rejectWithValue("Failed to load categories.");
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/add",
  async (category: Partial<Category>, { rejectWithValue }) => {
    try {
      const res = await api.post("/categories", category);
      return res.data;
    } catch {
      return rejectWithValue("Failed to add category.");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, updates }: { id: string; updates: Partial<Category> }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/categories/${id}`, updates);
      return res.data;
    } catch {
      return rejectWithValue("Failed to update category.");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/categories/${id}`);
      return id;
    } catch {
      return rejectWithValue("Failed to delete category.");
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategoryCache: (state) => {
      localStorage.removeItem(StorageParams.CACHED_CATEGORIES);
      state.categories = [];
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        const index = state.categories.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
        state.categories = state.categories.filter((c) => c.id !== action.payload);
      });
  },
});

export const { clearCategoryCache } = categorySlice.actions;
export default categorySlice.reducer;
