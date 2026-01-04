import baseApi from "../BaseApi/BaseApi";

const ClientSupportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSupport: builder.mutation({
      query: (data: any) => ({
        url: "client-support/create-ticket",
        method: "POST",
        body: data,
      }),
    }),
    getMyTickets: builder.query({
      query: () => ({
        url: "client-support/my-tickets",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateSupportMutation, useGetMyTicketsQuery } =
  ClientSupportApi;
export default ClientSupportApi;
