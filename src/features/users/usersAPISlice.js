import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8080"}),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "users"
        })
    })
    
})

export const { useGetUsersQuery } = usersApi;