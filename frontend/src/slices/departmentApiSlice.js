import { DEPARTMENTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const departmentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDepartments: builder.query({
            query: () => ({
                url: DEPARTMENTS_URL,
                method: 'GET',
            }),
            providesTags: ['Department'],
        }),
        getDepartmentById: builder.query({
            query: (id) => ({
                url: `${DEPARTMENTS_URL}/${id}`,
                method: 'GET',
            }),
        }),
        createDepartment: builder.mutation({
            query: (data) => ({
                url: DEPARTMENTS_URL,
                method: 'POST',
                body: data,
            }),
        }),
        updateDepartment: builder.mutation({
            query: ({ id, data }) => ({
                url: `${DEPARTMENTS_URL}/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: `${DEPARTMENTS_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetDepartmentsQuery,
    useGetDepartmentByIdQuery,
    useCreateDepartmentMutation,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation,
} = departmentApiSlice;
