import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    drawer: false,
    search: false,
    comments: {
      data: [],
      status: false,
      postID: 0,
      count: 0
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
    toggleComment: (state, action) => {
      state.comments.status = !state.comments.status
      state.comments.postID = action.payload
    },
    setCommentData: (state, action) => {
      state.comments.data = action.payload
    },
    addCommentData: (state, action) => {
      state.comments.data.push(action.payload)
    },
    setCommentCount: (state, action) => {
      state.comments.count = action.payload
    },
    reset: (state) => {
      state.drawer = false;
      state.search = false;
    },
  },
});

export const { drawerToggle, searchToggle, setCommentData, addCommentData, setCommentCount, toggleComment, reset } = settingSlice.actions;
export default settingSlice.reducer;
