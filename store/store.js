import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./settingsSlice";

export default configureStore({
    reducer: {
      settings: settingReducer,
    },
  });