import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL + '/admin',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Users', 'AiContacts', 'Analytics', 'Contacts'],
  endpoints: (builder) => ({

    getAnalyticsInsights: builder.query({
      query: () => '/getAnalysticsInsights',
      providesTags: ['Analytics'],
    }),

    getUserList: builder.query({
      query: () => '/getAllUsers',
      providesTags: ['Users'],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/deleteUser/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),

    activateOrDeactivate: builder.mutation({
      query: (id) => ({
        url: `/activateOrDeactivateUser/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Users'],
    }),

    allAiContactsList: builder.query({
      query: () => '/getAllAiContacts',
      providesTags: ['AiContacts'],
    }),

    updateAiContact: builder.mutation({
      query: ({ id, aiContact }) => ({
        url: `/updateAiContact/${id}`,
        method: 'PUT',
        body: aiContact,
      }),
      invalidatesTags: ['AiContacts'],
    }),

    deleteAiContact: builder.mutation({
      query: (id) => ({
        url: `/deleteAiContact/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AiContacts'],
    }),

    getContacts: builder.query({
      query: () => '/getContacts',
      providesTags: ['Contacts'],
    }),


    // Create AI contact (absolute URL to satisfy requirement)
    addAdminAiContact: builder.mutation({
      query: (payload) => ({
        url: '/addAdminAiContact',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['AiContacts'],
    }),

    // Fetch dropdown options for the Create AI Contact form (absolute URL)
    getElements: builder.query({
      query: () => 'https://52.200.106.168:8000/api/v1/user/getElements',
      providesTags: [],
    }),

    // List admin AI contacts filtered by type
    getAdminAiContacts: builder.query({
      query: (typeValue) => `/getAdminAiContacts?type=${encodeURIComponent(typeValue)}`,
      providesTags: ['AiContacts'],
    }),

    // Update admin AI contact
    updateAdminAiContact: builder.mutation({
      query: (payload) => ({
        url: 'https://52.200.106.168:8000/api/v1/admin/updateAdminAiContact',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['AiContacts'],
    }),

    // Delete admin AI contact
    deleteAdminAiContact: builder.mutation({
      query: (id) => ({
        url: '/deleteAdminAiContact',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['AiContacts'],
    }),

    // Edit elements (add/update/delete values)
    editElements: builder.mutation({
      query: (payload) => ({
        url: '/editElements',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Elements'],
    }),


  }),
});

export const {
  useGetAnalyticsInsightsQuery,
  useGetUserListQuery,
  useDeleteUserMutation,
  useActivateOrDeactivateMutation,
  useAllAiContactsListQuery,
  useUpdateAiContactMutation,
  useDeleteAiContactMutation,
  useGetContactsQuery,
  useAddAdminAiContactMutation,
  useGetElementsQuery,
  useGetAdminAiContactsQuery,
  useUpdateAdminAiContactMutation,
  useDeleteAdminAiContactMutation,
  useEditElementsMutation,
} = adminApi;


