import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery("http://localhost:4200/"),
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => "users",
        }),
        signInUser: build.mutation({
            query: (user) => ({
                url: "api/auth/registration",
                method: "PUT",
                body: user,
            })
        }),
        logInUser: build.mutation({
            query: (data) => ({
                url: "api/auth/login",
                method: "PUT",
                body: data,
            })
        }),
    }) ,
})

export const { useGetUsersQuery, useSignInUserMutation, useLogInUserMutation } = usersApi;