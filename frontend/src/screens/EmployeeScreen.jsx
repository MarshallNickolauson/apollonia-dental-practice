import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    useDeleteEmployeeMutation,
    useGetEmployeeByIdQuery,
    useUpdateEmployeeMutation,
} from '../slices/employeeApiSlice';
import { FaTrashAlt } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { useGetDepartmentsQuery } from '../slices/departmentApiSlice';

const EmployeeScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [updateEmployee, { isLoading: isEmployeeUpdating }] =
        useUpdateEmployeeMutation();
    const [deleteEmployee, { isLoading: isEmployeeDeleting }] =
        useDeleteEmployeeMutation();
    const { data: employee, error, isLoading } = useGetEmployeeByIdQuery(id);
    const { data: departments } = useGetDepartmentsQuery();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        departmentId: '',
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                firstName: employee.firstName,
                lastName: employee.lastName,
                departmentId: employee.department,
            });
        }
    }, [employee]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await deleteEmployee(id).unwrap();
                navigate('/employees');
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateEmployee({
                id: id,
                data: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    department: formData.departmentId,
                },
            }).unwrap();
            console.log(res);
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    if (isLoading) return <ClipLoader size={50} />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl font-semibold'>Employee Details</h1>
                <div className='flex space-x-2'>
                    <FaTrashAlt
                        className='cursor-pointer text-red-500'
                        onClick={handleDelete}
                    />
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className='bg-white shadow p-6 rounded-lg'
            >
                <div className='mb-4'>
                    <label htmlFor='firstName' className='font-medium text-lg'>
                        First Name
                    </label>
                    <input
                        type='text'
                        id='firstName'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                        className='w-full p-2 border rounded-lg'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='lastName' className='font-medium text-lg'>
                        Last Name
                    </label>
                    <input
                        type='text'
                        id='lastName'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                        className='w-full p-2 border rounded-lg'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='department' className='font-medium text-lg'>
                        Department
                    </label>
                    <select
                        id='department'
                        name='departmentId'
                        value={formData.departmentId}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                departmentId: e.target.value,
                            }))
                        }
                        className='w-full p-2 border rounded-lg'
                    >
                        <option value=''>Select Department</option>
                        {departments?.map((dept) => (
                            <option key={dept._id} value={dept._id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex justify-end space-x-4 mt-6'>
                    <button
                        type='button'
                        className='px-4 py-2 bg-gray-500 text-white rounded-lg'
                        onClick={() => navigate('/employees')}
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='px-4 py-2 bg-blue-500 text-white rounded-lg'
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeScreen;
