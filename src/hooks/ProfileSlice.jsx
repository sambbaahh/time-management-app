import {createSlice} from "@reduxjs/toolkit";

//Redux for showing profile dialog
export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isVisibleProfile: false,
  },
  reducers: {
    showProfileRedux: (state) => {
      state.isVisibleProfile = true;
    },
    hideProfileRedux: (state) => {
      state.isVisibleProfile = false;
    },
  },
});

export const {showProfileRedux, hideProfileRedux} = profileSlice.actions;

export default profileSlice.reducer;
