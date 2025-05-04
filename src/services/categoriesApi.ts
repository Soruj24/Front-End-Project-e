import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getCategories: builder.query<string[], void>({
      query: () => 'products/categories',
      transformResponse: (response: string[]) => response
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;