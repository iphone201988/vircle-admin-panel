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

    getAnalyticsInsights: builder.query<any, void>({
      query: () => '/getAnalysticsInsights',
      providesTags: ['Analytics'],
    }),


    getUserList: builder.query<any, void>({
      query: () => '/getAllUsers',
      providesTags: ['Users'],
    }),


    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/deleteUser/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),


    activateOrDeactivate: builder.mutation<any, string>({
      query: (id) => ({
        url: `/activateOrDeactivateUser/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Users'],
    }),


    allAiContactsList: builder.query<any, void>({
      query: () => '/getAllAiContacts',
      providesTags: ['AiContacts'],
    }),


    updateAiContact: builder.mutation<any, { id: string; aiContact: any }>({
      query: ({ id, aiContact }) => ({
        url: `/updateAiContact/${id}`,
        method: 'PUT',
        body: aiContact,
      }),
      invalidatesTags: ['AiContacts'],
    }),


    deleteAiContact: builder.mutation<any, string>({
      query: (id) => ({
        url: `/deleteAiContact/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AiContacts'],
    }),


    getContacts: builder.query<any, void>({
      query: () => '/getContacts',
      providesTags: ['Contacts'],
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
} = adminApi;
