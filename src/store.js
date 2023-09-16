import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import screenSlice from "./features/screen/screenSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    screen: screenSlice,
  },
});
