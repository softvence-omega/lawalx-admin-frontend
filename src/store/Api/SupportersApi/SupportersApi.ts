import { ApiResponse } from "@/types/ApiTypes/ApiResponse";
import baseApi from "../BaseApi/BaseApi";
import { Supporter } from "@/types/Supporters/SuppoprtersApi";

const supportersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 00. GET all supporters
    getAllSupporters: builder.query<ApiResponse<Supporter[]>, void>({
      query: () => "/supporters",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((supporter) => ({
                type: "Supporters" as const,
                id: supporter.id,
              })),
              { type: "Supporters" as const, id: "LIST" },
            ]
          : [{ type: "Supporters" as const, id: "LIST" }],
    }),

    // 01. GET all tickets (supporter scope)
    getAllSupporterTickets: builder.query({
      query: () => "/supporters-support/all-tickets",
      providesTags: ["SupporterTickets"],
    }),

    // 02. GET my assigned tickets
    getMyTickets: builder.query({
      query: () => "/supporters-support/my-tickets",
      providesTags: ["SupporterTickets"],
    }),

    // 03. PATCH ticket status
    updateTicketStatus: builder.mutation({
      query: ({ ticketId, status }) => ({
        url: `/supporters-support/${ticketId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["SupporterTickets"],
    }),

    // 04. GET dashboard stack
    getSupporterDashboardStack: builder.query({
      query: () => "/supporters-support/dashboard-stack",
    }),

    // 05. GET ticket messages
    getTicketMessagesById: builder.query({
      query: (ticketId) => `/supporters-support/${ticketId}/ticket-messages`,
      providesTags: ["SupporterTickets"],
    }),
  }),
});

export const {
  useGetAllSupportersQuery,
  useGetAllSupporterTicketsQuery,
  useGetMyTicketsQuery,
  useUpdateTicketStatusMutation,
  useGetSupporterDashboardStackQuery,
  useGetTicketMessagesByIdQuery,
  useLazyGetTicketMessagesByIdQuery,
} = supportersApi;

export default supportersApi;
