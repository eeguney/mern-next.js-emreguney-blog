import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    drawer: false,
    search: false,
    darkMode: false,
    comments: {
      data: [],
      status: false,
      postID: 0,
      count: 0,
    },
  },
  reducers: {
    drawerToggle: (state) => {
      state.search = false;
      state.drawer = !state.drawer;
    },
    darkmodeToggle: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    searchToggle: (state) => {
      state.drawer = false;
      state.search = !state.search;
    },
    toggleComment: (state, action) => {
      state.comments.status = !state.comments.status;
      state.comments.postID = action.payload;
    },
    setCommentData: (state, action) => {
      state.comments.data = action.payload;
    },
    addCommentData: (state, action) => {
      state.comments.data.push(action.payload);
    },
    setCommentCount: (state, action) => {
      state.comments.count = action.payload;
    },
    reset: (state) => {
      state.drawer = false;
      state.search = false;
    },
  },
});

export const {
  drawerToggle,
  searchToggle,
  setCommentData,
  darkmodeToggle,
  setDarkMode,
  addCommentData,
  setCommentCount,
  toggleComment,
  reset,
} = settingSlice.actions;
export default settingSlice.reducer;
