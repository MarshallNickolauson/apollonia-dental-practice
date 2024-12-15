import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    useDeleteEmployeeMutation,
    useGetEmployeesQuery,
    useCreateEmployeeMutation,
} from '../slices/employeeApiSlice';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { useGetDepartmentsQuery } from '../slices/departmentApiSlice';

const EmployeeListScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [deleteingEmployeeId, setDeletingEmployeeId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        firstName: '',
        lastName: '',
        department: '',
    });

    const {
        data: employees,
        isLoading: isEmployeesLoading,
        error,
        refetch,
    } = useGetEmployeesQuery();

    useEffect(() => {
        refetch();
    }, [location])

    const { data: departments } = useGetDepartmentsQuery();

    const [deleteEmployee] = useDeleteEmployeeMutation();
    const [createEmployee, { isLoading: isCreating }] =
        useCreateEmployeeMutation();

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            setDeletingEmployeeId(id);
            try {
                await deleteEmployee(id).unwrap();
                refetch();
            } catch (error) {
                console.error('Error deleting employee:', error);
            } finally {
                setDeletingEmployeeId(null);
            }
        }
    };

    const isFormValid = Object.values(newEmployee).every(
        (value) => value && value.trim() !== ''
    );

    const handleAddEmployee = async () => {
        try {
            await createEmployee(newEmployee).unwrap();
            refetch();
            setShowModal(false);
            setNewEmployee({
                firstName: '',
                lastName: '',
                department: '',
            });
        } catch (error) {
            console.error('Error creating employee:', error);
        }
    };

    if (isEmployeesLoading) return <>Loading...</>;
    
    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <p>Status: {error.status}</p>
                <p>Message: {error.error?.data?.message || error.error || 'Something went wrong'}</p>
            </div>
        );
    }

    return (
        <div>
            <div className={showModal ? 'blur-sm' : ''}>
                <h1 className='text-2xl'>Employee Database</h1>
                {/* Add Button */}
                <div className='flex justify-end mb-2'>
                    <h1
                        className='mt-1 mr-1 text-blue-500 hover:underline hover:cursor-pointer'
                        onClick={() => setShowModal(true)}
                    >
                        Add Employee
                    </h1>
                </div>

                {/* Top Row Indicator */}
                <div className='flex justify-between items-center bg-gray-200 p-4 rounded-t'>
                    <h1 className='flex-1 font-semibold text-center'>
                        First Name
                    </h1>
                    <h1 className='flex-1 font-semibold text-center'>
                        Last Name
                    </h1>
                    <h1 className='flex-1 font-semibold text-center'>
                        Department
                    </h1>
                    <h1 className='flex-1 font-semibold text-center'>Action</h1>
                </div>

                {/* Employee Cards */}
                <div>
                    {employees && employees.map((employee) => (
                        <div
                            key={employee._id}
                            className='flex justify-between items-center bg-white shadow p-3 border border-gray-200'
                        >
                            <div className='flex-1 text-center'>
                                {employee.firstName}
                            </div>
                            <div className='flex-1 text-center'>
                                {employee.lastName}
                            </div>
                            <div className='flex-1 text-center'>
                                {employee.department?.name || 'N/A'}
                            </div>
                            <div className='flex-1'>
                                {deleteingEmployeeId === employee._id ? (
                                    <div className='flex justify-center'>
                                        <ClipLoader size={25} />
                                    </div>
                                ) : (
                                    <div className='flex flex-row space-x-2 justify-center'>
                                        <FaEdit
                                            className='hover:cursor-pointer'
                                            onClick={() =>
                                                navigate(
                                                    `/employee/${employee._id}`
                                                )
                                            }
                                        />
                                        <FaTrashAlt
                                            className='hover:cursor-pointer'
                                            onClick={() =>
                                                handleDelete(employee._id)
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                        <h2 className='text-xl font-semibold mb-4'>
                            Add New Employee
                        </h2>
                        <form>
                            <label className='block mb-2 font-medium'>
                                First Name
                            </label>
                            <input
                                type='text'
                                className='w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
                                value={newEmployee.firstName}
                                onChange={(e) =>
                                    setNewEmployee({
                                        ...newEmployee,
                                        firstName: e.target.value,
                                    })
                                }
                            />
                            <label className='block mb-2 font-medium'>
                                Last Name
                            </label>
                            <input
                                type='text'
                                className='w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
                                value={newEmployee.lastName}
                                onChange={(e) =>
                                    setNewEmployee({
                                        ...newEmployee,
                                        lastName: e.target.value,
                                    })
                                }
                            />
                            <label className='block mb-2 font-medium'>
                                Department
                            </label>
                            <select
                                type='text'
                                className='w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer'
                                value={newEmployee.department}
                                onChange={(e) =>
                                    setNewEmployee({
                                        ...newEmployee,
                                        department: e.target.value,
                                    })
                                }
                            >
                                <option value='' disabled>
                                    Select a Department
                                </option>
                                {departments.map((department) => (
                                    <option
                                        key={department._id}
                                        value={department._id}
                                    >
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                            <div className='flex justify-end space-x-2'>
                                {isCreating && (
                                    <div className='mt-1 mr-2'>
                                        <ClipLoader size={30} />
                                    </div>
                                )}
                                <button
                                    type='button'
                                    className='px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500'
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type='button'
                                    className={`px-4 py-2 rounded text-white ${
                                        isCreating || !isFormValid
                                            ? 'bg-blue-300 cursor-not-allowed'
                                            : 'bg-blue-500 hover:bg-blue-600'
                                    }`}
                                    onClick={handleAddEmployee}
                                    disabled={isCreating || !isFormValid}
                                >
                                    Add Employee
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeListScreen;
