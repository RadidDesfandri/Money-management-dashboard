import { FullTypeUser } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FullTypeUser = {
  id: 0,
  email: "",
  firstname: "",
  lastname: "",
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
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.avatar = action.payload.avatar;
      state.createdAt = action.payload.createdAt;
    },

    logoutUser: (state) => {
      state.id = 0;
      state.email = "";
      state.firstname = "";
      state.lastname = "";
      state.avatar = null;
      state.createdAt = "";
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
