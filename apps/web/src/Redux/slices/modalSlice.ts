import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalSlice {
  isOpenOtp: boolean;
}

const initialState: ModalSlice = {
  isOpenOtp: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsModalOpenOtp: (state, action: PayloadAction<boolean>) => {
      state.isOpenOtp = action.payload;
    },

    toggleModalOtp: (state) => {
      state.isOpenOtp = !state.isOpenOtp;
    },
  },
});

export const { setIsModalOpenOtp, toggleModalOtp } = modalSlice.actions;
export default modalSlice.reducer;
