import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:4200/"}),
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => "users",
        }),
        signInUser: build.mutation({
            query: (user) => ({
                url: "api/auth/registration",
                method: "POST",
                body: user,
            })
        }),
        logInUser: build.mutation({
            query: (body) => ({
                url: "api/auth/login",
                method: "POST",
                body,
            })
        }),
    }) ,
})

export const { useGetUsersQuery, useSignInUserMutation, useLogInUserMutation } = usersApi;