import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Match Prisma User model
export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  gender: string;
  role: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  city?: string;
  country?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post('/admins/login', { email, password });

      if (response.data?.id) {
        return response.data;
      }

      return rejectWithValue('Invalid login response');
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Login failed');
    }
  }
);

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  // Optional: Add API call for logout if needed
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { setUser, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
