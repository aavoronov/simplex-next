import { createSlice } from "@reduxjs/toolkit";

interface NotificationsState {
  text: string;
  type: "info" | "success" | "warning" | "error" | "default";
}

const initialState: NotificationsState = {
  text: "",
  type: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    toggle(state, action) {
      state.text = action.payload.text;
      state.type = action.payload.type;
    },
  },
});

export const { toggle } = notificationSlice.actions;
export default notificationSlice.reducer;
