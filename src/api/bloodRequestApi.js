import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bloodRequestApi = createApi({
  reducerPath: "bloodRequestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://life-link-server-alpha.vercel.app/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Requests", "HospitalRequests", "UserRequests"],

  endpoints: (builder) => ({
    createBloodRequest: builder.mutation({
      query: (body) => ({
        url: "/blood-requests/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Requests", "UserRequests"],
    }),

    createDonationRequest: builder.mutation({
      query: (body) => ({
        url: "/blood-requests/create-donor",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Requests", "UserRequests"],
    }),

    getAllBloodRequests: builder.query({
      query: () => ({
        url: "/blood-requests",
        method: "GET",
      }),
      providesTags: ["Requests"],
    }),

    acceptRequest: builder.mutation({
      query: (requestId) => ({
        url: `/blood-requests/${requestId}/accept`,
        method: "PATCH",
      }),
      invalidatesTags: ["Requests", "HospitalRequests"],
    }),

    rejectRequest: builder.mutation({
      query: (requestId) => ({
        url: `/blood-requests/${requestId}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: ["Requests", "HospitalRequests"],
    }),

    getHospitalRequests: builder.query({
      query: () => ({
        url: "/blood-requests/hospital-request",
        method: "GET",
      }),
      providesTags: ["HospitalRequests"],
    }),

    getUserRequests: builder.query({
      query: () => ({
        url: "/blood-requests/user-request",
        method: "GET",
      }),
      providesTags: ["UserRequests"],
    }),
  }),
});

export const {
  useCreateBloodRequestMutation,
  useGetAllBloodRequestsQuery,
  useAcceptRequestMutation,
  useRejectRequestMutation,
  useCreateDonationRequestMutation,
  useGetHospitalRequestsQuery,
  useGetUserRequestsQuery,
} = bloodRequestApi;
