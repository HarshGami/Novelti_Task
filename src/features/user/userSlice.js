import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createNew: (state, action) => {
      let users = JSON.stringify([...state.users, action.payload.user]);
      localStorage.setItem("users", users);
      state.users = JSON.parse(localStorage.getItem("users"));
    },
    deleteUser: (state, action) => {
      let oldstate = state.users;
    },
    editUser: (state, action) => {
      let oldstate = state.users;
    },
  },
});

export const { createNew, deleteUser, editUser } = userSlice.actions;

export default userSlice.reducer;
