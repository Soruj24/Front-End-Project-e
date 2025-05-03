import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    images: string;
    brand: string;
    stock: number;
    rating: {
        rate: number;
        count: number;
    };
}

export const productApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
    tagTypes: ['Products'],
    endpoints: (build) => ({
        // Get all products (with optional search and pagination)
        getProducts: build.query<{products: Product[], total: number, skip: number, limit: number}, { search?: string; limit?: number; skip?: number } | void>({
            query: (params) => {
                let url = 'products';
                const queryParams: string[] = [];
                if (params?.search) queryParams.push(`q=${encodeURIComponent(params.search)}`);
                if (params?.limit) queryParams.push(`limit=${params.limit}`);
                if (params?.skip) queryParams.push(`skip=${params.skip}`);
                if (queryParams.length > 0) url += `/search?${queryParams.join('&')}`;
                return url;
            },
            // Remove transformResponse to keep the full response
            providesTags: (result) =>
                result?.products
                    ? [
                        ...result.products.map(({ id }) => ({ type: 'Products', id }) as const),
                        { type: 'Products', id: 'LIST' },
                    ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),

        // Get single product
        getProduct: build.query<Product, number>({
            query: (id) => `products/${id}`,
            providesTags: (_, __, id) => [{ type: 'Products', id }],
        }),

        // Add product
        addProduct: build.mutation<Product, Partial<Product>>({
            query(body) {
                return {
                    url: 'products/add',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),

        // Update product
        updateProduct: build.mutation<Product, Partial<Product>>({
            query(data) {
                const { id, ...body } = data;
                return {
                    url: `products/${id}`,
                    method: 'PUT',
                    body,
                };
            },
            invalidatesTags: (_, __, { id }) => [{ type: 'Products', id }],
        }),

        // Delete product
        deleteProduct: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `products/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: (_, __, id) => [{ type: 'Products', id }],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;
