import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  view: false,
  edit: false,
  removeUser: false,
  create: false,
  userData: {},
};

export const creenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setCreate: (state, action) => {
      state.create = action.payload;
      state.userData = {};
    },
    setRemoveUser: (state, action) => {
      state.removeUser = action.payload;
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setCreate, setRemoveUser, setEdit, setView, setUserData } =
  creenSlice.actions;

export default creenSlice.reducer;
