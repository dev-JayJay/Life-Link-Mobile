import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hospitalApi = createApi({
  reducerPath: "hospitalApi",
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
  endpoints: (builder) => ({
    getAllHospitals: builder.query({
      query: () => ({
        url: "/hospitals",
        method: "GET",
      }),
    }),

    getHospitalDonations: builder.query({
      query: () => ({
        url: "/hospitals/donations",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllHospitalsQuery, useGetHospitalDonationsQuery } =
  hospitalApi;
