import { EMPLOYEES_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: () => ({
                url: EMPLOYEES_URL,
                method: 'GET',
            }),
        }),
        getEmployeeById: builder.query({
            query: (id) => ({
                url: `${EMPLOYEES_URL}/${id}`,
                method: 'GET',
            }),
        }),
        createEmployee: builder.mutation({
            query: (data) => ({
                url: EMPLOYEES_URL,
                method: 'POST',
                body: data,
            }),
        }),
        updateEmployee: builder.mutation({
            query: ({ id, data }) => ({
                url: `${EMPLOYEES_URL}/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `${EMPLOYEES_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetEmployeesQuery,
    useGetEmployeeByIdQuery,
    useCreateEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
} = employeeApiSlice;
