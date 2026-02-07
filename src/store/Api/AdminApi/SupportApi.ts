import baseApi from "../BaseApi/BaseApi";
import {
  GetAllSupportTicketsResponse,
  SupportTicket,
} from "@/types/SupportTypes";

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTickets: builder.query<GetAllSupportTicketsResponse, void>({
      query: () => "/admin/all-tickets",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((ticket: SupportTicket) => ({
                type: "Tickets" as const,
                id: ticket.id,
              })),
              { type: "Tickets", id: "LIST" },
            ]
          : [{ type: "Tickets", id: "LIST" }],
    }),
    assignTicket: builder.mutation({
      query: ({ ticketId, assignedTo }) => ({
        url: `/admin/${ticketId}/assign`,
        method: "PATCH",
        body: { assignedTo },
      }),
      invalidatesTags: (_result, _error, { ticketId }) => [
        { type: "Tickets", id: ticketId },
      ],
    }),
    updateTicket: builder.mutation({
      query: ({ ticketId, payload }) => {
        return {
          url: `/admin/${ticketId}/ticket`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: (_result, _error, { ticketId }) => [
        { type: "Tickets", id: ticketId },
      ],
    }),
    deleteTicket: builder.mutation({
      query: (ticketId) => ({
        url: `/admin/${ticketId}/hard-delete`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, ticketId) => [
        { type: "Tickets", id: ticketId },
      ],
    }),
    getAllSupporter: builder.query({
      query: () => "/admin/all-supporters",
      // providesTags: (result) =>
      //   result
      //     ? [
      //         ...result.data.map((supporter: any) => ({
      //           type: "Supporters" as const,
      //           id: supporter._id || supporter.id,
      //         })),
      //         { type: "Supporters", id: "LIST" },
      //       ]
      //     : [{ type: "Supporters", id: "LIST" }],
    }),
    updateSupporter: builder.mutation({
      query: ({ supporterId, data }) => ({
        url: `/admin/${supporterId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { supporterId }) => [
        { type: "Supporters", id: supporterId },
      ],
    }),
    softDeleteSupporter: builder.mutation({
      query: (supporterId) => ({
        url: `/admin/${supporterId}/soft`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, supporterId) => [
        { type: "Supporters", id: supporterId },
      ],
    }),
    hardDeleteSupporter: builder.mutation({
      query: (supporterId) => ({
        url: `/admin/${supporterId}/hard`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, supporterId) => [
        { type: "Supporters", id: supporterId },
      ],
    }),
  }),
});

export const {
  useGetAllTicketsQuery,
  useAssignTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
  useGetAllSupporterQuery,
  useUpdateSupporterMutation,
  useSoftDeleteSupporterMutation,
  useHardDeleteSupporterMutation,
} = supportApi;
export default supportApi;
