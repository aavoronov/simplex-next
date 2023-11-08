import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: number;
  login: string;
  role: string;
  name: string;
  profilePic?: string;
  inviteToken: string;
  createdAt: string;
}

const initialState: UserState = {
  id: null,
  login: "",
  role: "",
  name: "",
  inviteToken: "",
  createdAt: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile(state, action: { type: string; payload: Partial<UserState> }) {
      return { ...state, ...action.payload };
    },
    resetUser: () => initialState,
  },
});

export const { updateProfile, resetUser } = userSlice.actions;
export default userSlice.reducer;
