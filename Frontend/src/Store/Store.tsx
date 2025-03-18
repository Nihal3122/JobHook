import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../Slices/UserSlice";
import profileReducer from "../Slices/ProfileSlice";
import filtereReducer from "../Slices/FilterSlice";
import sortReducer from "../Slices/SortSlice";

export default configureStore({
  reducer: {
    user: useReducer,
    profile: profileReducer,
    filter: filtereReducer,
    sort: sortReducer,
  },
});
