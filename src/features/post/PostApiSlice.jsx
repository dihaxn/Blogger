import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '/posts',
            providesTags: ['Post'],
        }),
        getPostById: builder.query({
            query: (id) => `/posts/${id}`,
            providesTags: (result, error, id) => [{ type: 'Post', id }],
        }),
        addPost: builder.mutation({
            query: (newPost) => ({
                url: '/posts',
                method: 'POST',
                body: newPost,
            }),
            invalidatesTags: ['Post'],
        }),
        updatePost: builder.mutation({
            query: ({ id, ...updatedPost }) => ({
                url: `/posts/${id}`,
                method: 'PUT',
                body: updatedPost,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post'],
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostByIdQuery,
    useAddPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = postApi;