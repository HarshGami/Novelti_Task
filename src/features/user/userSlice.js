import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [
    {
      firstName: "Harsh",
      lastName: "Patel",
      email: "harshgami09876@gmail.com",
      mobile: "9323717109",
      address1: "01, ram nivas society, palanpur",
      pinCode: "385001",
      id: 0,
      mobileCode: "IN",
      state: { name: "Gujarat", code: "IN" },
      country: { name: "India", code: "IN" },
    },
  ],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createNew: (state, action) => {
      let users = JSON.stringify([
        ...state.users,
        { ...action.payload, id: state.users.length },
      ]);
      localStorage.setItem("users", users);
      state.users = JSON.parse(localStorage.getItem("users"));
    },
    deleteUser: (state, action) => {
      state.users.splice(action.payload.id, 1);
      if (state.users.length === 0) {
        localStorage.clear();
        state = initialState;
      } else {
        let users = JSON.stringify(state.users);
        localStorage.setItem("users", users);
        state.users = JSON.parse(localStorage.getItem("users"));
      }
    },
    editUser: (state, action) => {
      state.users[action.payload.id] = action.payload;
      let users = JSON.stringify(state.users);
      localStorage.setItem("users", users);
      state.users = JSON.parse(localStorage.getItem("users"));
    },
  },
});

export const { createNew, deleteUser, editUser } = userSlice.actions;

export default userSlice.reducer;
