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
        auth: build.mutation({
            query: () => ({
                url: "api/auth/auth",
                method: "POST",
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
            })
        }),
        imageUpdate: build.mutation({
            query: (formData) => ({
                url: "api/auth/image-update",
                method: "POST",
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                body: formData,
            })
        })
    }) ,
})

export const { useGetUsersQuery, useSignInUserMutation, useLogInUserMutation, useAuthMutation, useImageUpdateMutation } = usersApi;