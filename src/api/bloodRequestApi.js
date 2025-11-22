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

    createDonationRequest: builder.mutation({
      query: (body) => ({
        url: "/blood-requests/create-donor",
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

    getHospitalRequests: builder.query({
      query: () => ({
        url: "/blood-requests/hospital-request",
        method: "GET",
      }),
    }),

    getUserRequests: builder.query({
      query: () => ({
        url: "/blood-requests/user-request",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateBloodRequestMutation,
  useGetAllBloodRequestsQuery,
  useAcceptRequestMutation,
  useCreateDonationRequestMutation,
  useGetHospitalRequestsQuery,
  useGetUserRequestsQuery,
} = bloodRequestApi;
