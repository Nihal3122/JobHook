import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "../Services/ProfileService";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {
    changeProfile: (state, action) => {
      state = updateProfile(action.payload);
      return action.payload;
    },
    setProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export default ProfileSlice.reducer;
export const { changeProfile, setProfile } = ProfileSlice.actions;
