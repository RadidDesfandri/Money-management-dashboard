import { FullTypeUser } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FullTypeUser = {
  id: 0,
  email: "",
  username: "",
  firstname: "",
  lastname: "",
  phone: "",
  avatar: null,
  createdAt: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<FullTypeUser>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.phone = action.payload.phone;
      state.avatar = action.payload.avatar;
      state.createdAt = action.payload.createdAt;
    },

    logoutUser: (state) => {
      state.id = 0;
      state.email = "";
      state.username = "";
      state.firstname = "";
      state.lastname = "";
      state.phone = "";
      state.avatar = null;
      state.createdAt = "";
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
