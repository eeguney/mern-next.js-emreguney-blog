import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    drawer: false,
    search: false,
    comments: {
      status: false
    }
  },
  reducers: {
    drawerToggle: (state) => {
      state.search = false
      state.drawer = !state.drawer;
    },
    searchToggle: (state) => {
      state.drawer = false
      state.search = !state.search;
    },
    toggleComment: (state) => {
      state.comments.status = !state.comments.status
    },
    reset: (state) => {
      state.drawer = false;
      state.search = false;
    },
  },
});

export const { drawerToggle, searchToggle, toggleComment, reset } = settingSlice.actions;
export default settingSlice.reducer;
