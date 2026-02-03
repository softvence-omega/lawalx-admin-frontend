import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export interface User {
  email: string;
  phone: string;
  userId: string;
  userEmail?: string;
  userPhone?: string;
  role: string;
  accessToken?: string;
  refreshToken?: string;
}
interface AuthState {
  user: Partial<User> | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const token = action.payload?.specialToken
        ? action.payload?.specialToken
        : action.payload?.accessToken;
      const decode = jwtDecode(token as string) as User;
      console.log(decode);
      if (action.payload.refreshToken) {
        state.user = {
          ...state.user,
          email: decode.email,
          userId: decode.userId,
          role: decode.role,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        };
      } else {
        state.user = {
          ...state.user,
          userEmail: action.payload.email,
          userPhone: action.payload.phone,
          email: decode.userEmail,
          phone: decode.userPhone,
          userId: action.payload.userId,
          role: decode.role,
          accessToken: action.payload.specialToken,
        };
      }
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { logOut, setUser } = authSlice.actions;
export default authSlice.reducer;
