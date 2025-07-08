
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import StorageParams from "../../constants/StorageParams";

// store/productSlice.ts

export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  price: number;
  images: string[];
  stock: number;
  status: "active" | "low_stock" | "out_of_stock" | "archived";
  isDeleted: boolean;
  categoryId: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
}


interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
};

export const loadProducts = createAsyncThunk(
  "products/load",
  async (_, { rejectWithValue }) => {
    try {
      const cached = localStorage.getItem(StorageParams.CACHED_PRODUCTS);
      const cachedParsed: Product[] = cached ? JSON.parse(cached) : [];

      const res = await api.get("/products");
      const latest: Product[] = res.data;

      if (JSON.stringify(cachedParsed) !== JSON.stringify(latest)) {
        localStorage.setItem(StorageParams.CACHED_PRODUCTS, JSON.stringify(latest));
        return latest;
      }

      return cachedParsed;
    } catch (err) {
      return rejectWithValue("Failed to load products.");
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/add",
  async (product: Partial<Product>, { rejectWithValue }) => {
    try {
      const res = await api.post("/products", product);
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to add product.");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, updates }: { id: string; updates: Partial<Product> }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/products/${id}`, updates);
      return res.data;
    } catch {
      return rejectWithValue("Failed to update product.");
    }
  }
);


export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue("Failed to delete product.");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductCache: (state) => {
      localStorage.removeItem(StorageParams.CACHED_PRODUCTS);
      state.products = [];
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
         const index = state.products.findIndex((p) => p.id === action.payload.id);
          if (index !== -1) {
          state.products[index] = action.payload;
      }
    })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export const { clearProductCache } = productSlice.actions;
export default productSlice.reducer;
