import baseApi from "../BaseApi/BaseApi";

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a payment
    createPayment: builder.mutation({
      query: (data) => ({
        url: "/payments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payments"],
    }),
    // Get all payments
    getPayments: builder.query({
      query: () => "/payments",
      providesTags: ["Payments"],
    }),

    // Get payments stats
    getPaymentsStats: builder.query({
      query: () => "/payments/stats",
    }),

    // Get earnings report
    getPaymentsEarningReport: builder.query({
      query: () => "/payments/earning/report",
    }),

    // Get dashboard summary
    getPaymentsDashboardSummary: builder.query({
      query: () => "/payments/dashboard/summary",
    }),

    // Get payment by id
    getPaymentById: builder.query({
      query: (paymentId) => `/payments/${paymentId}`,
    }),

    // Update a payment
    updatePayment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/payments/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useCreatePaymentMutation,
  useGetPaymentsQuery,
  useGetPaymentsStatsQuery,
  useGetPaymentsEarningReportQuery,
  useGetPaymentsDashboardSummaryQuery,
  useGetPaymentByIdQuery,
  useUpdatePaymentMutation,
} = paymentsApi;
