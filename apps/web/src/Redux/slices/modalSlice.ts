import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalSlice {
  isOpen: boolean;
  isOpenOtp: boolean;
  isOpenFormUser: boolean;
  isLoadingSlice: boolean;
}

const initialState: ModalSlice = {
  isOpenOtp: false,
  isOpenFormUser: false,
  isOpen: false,
  isLoadingSlice: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsModalOpenOtp: (state, action: PayloadAction<boolean>) => {
      state.isOpenOtp = action.payload;
    },

    setIsModalOpenUser: (state, action: PayloadAction<boolean>) => {
      state.isOpenFormUser = action.payload;
    },

    setIsLoadingSlice: (state, action: PayloadAction<boolean>) => {
      state.isLoadingSlice = action.payload;
    },

    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  setIsModalOpenOtp,
  toggleModal,
  setIsLoadingSlice,
  setIsModalOpenUser,
} = modalSlice.actions;
export default modalSlice.reducer;
