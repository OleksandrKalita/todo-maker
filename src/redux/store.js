import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { usersApi } from "./userApi";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        user: userSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usersApi.middleware);
});