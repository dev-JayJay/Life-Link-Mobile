import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bloodRequestApi = createApi({
  reducerPath: "bloodRequestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.165.95:4000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createBloodRequest: builder.mutation({
      query: (body) => ({
        url: "/blood-requests/create",
        method: "POST",
        body,
      }),
    }),

    getAllBloodRequests: builder.query({
      query: () => ({
        url: "/blood-requests",
        method: "GET",
      }),
    }),

    acceptRequest: builder.mutation({
      query: (requestId) => ({
        url: `/blood-requests/${requestId}/accept`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateBloodRequestMutation,
  useGetAllBloodRequestsQuery,
  useAcceptRequestMutation,
} = bloodRequestApi;
