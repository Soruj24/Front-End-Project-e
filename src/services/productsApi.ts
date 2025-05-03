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
        // Get all products
        getProducts: build.query<Product[], void>({
            query: () => 'products',
            transformResponse: (response: { products: Product[] }) => response.products,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Products', id }) as const),
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
