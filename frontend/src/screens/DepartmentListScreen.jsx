import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useDeleteDepartmentMutation,
    useGetDepartmentsQuery,
    useCreateDepartmentMutation,
    useUpdateDepartmentMutation,
} from '../slices/departmentApiSlice';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const DepartmentListScreen = () => {
    const navigate = useNavigate();
    const [deletingDepartmentId, setDeletingDepartmentId] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newDepartmentName, setNewDepartmentName] = useState('');
    const [editingDepartmentId, setEditingDepartmentId] = useState(null);

    const {
        data: departments,
        isLoading: isDepartmentsLoading,
        error,
        refetch,
    } = useGetDepartmentsQuery();

    const [deleteDepartment] = useDeleteDepartmentMutation();
    const [createDepartment, { isLoading: isCreating }] =
        useCreateDepartmentMutation();
    const [updateDepartment, { isLoading: isUpdating }] =
        useUpdateDepartmentMutation();

    const handleAddDepartment = async () => {
        if (newDepartmentName.trim() === '') return;

        try {
            await createDepartment({ name: newDepartmentName }).unwrap();
            refetch();
            setShowAddModal(false);
            setNewDepartmentName('');
        } catch (error) {
            console.error('Error creating department:', error);
        }
    };

    const handleEditDepartment = async () => {
        if (newDepartmentName.trim() === '') return;

        try {
            await updateDepartment({
                id: editingDepartmentId,
                data: { name: newDepartmentName },
            }).unwrap();
            refetch();
            setShowEditModal(false);
            setNewDepartmentName('');
        } catch (error) {
            console.error('Error updating department:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            setDeletingDepartmentId(id);
            try {
                await deleteDepartment(id).unwrap();
                refetch();
            } catch (error) {
                console.error('Error deleting department:', error);
            } finally {
                setDeletingDepartmentId(null);
            }
        }
    };

    const isFormValid = newDepartmentName.trim() !== '';

    if (isDepartmentsLoading) return <>Loading...</>;
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
            <div className={showAddModal || showEditModal ? 'blur-sm' : ''}>
                <h1 className='text-2xl'>Department Database</h1>

                {/* Add Button */}
                <div className='flex justify-end mb-2'>
                    <h1
                        className='mt-1 mr-1 text-blue-500 hover:underline hover:cursor-pointer'
                        onClick={() => setShowAddModal(true)}
                    >
                        Add Department
                    </h1>
                </div>

                {/* Top Row Indicator */}
                <div className='flex justify-between items-center bg-gray-200 p-4 rounded-t'>
                    <h1 className='font-semibold text-center'>
                        Department Name
                    </h1>
                    <h1 className='font-semibold text-center'>Action</h1>
                </div>

                {/* Department Cards */}
                <div>
                    {departments && departments.map((department) => (
                        <div
                            key={department._id}
                            className='flex justify-between items-center bg-white shadow p-3 border border-gray-200'
                        >
                            <div>{department.name}</div>
                            <div>
                                {deletingDepartmentId === department._id ? (
                                    <div className='flex justify-center'>
                                        <ClipLoader size={25} />
                                    </div>
                                ) : (
                                    <div className='flex flex-row space-x-2 justify-center'>
                                        <FaEdit
                                            className='hover:cursor-pointer'
                                            onClick={() => {
                                                setEditingDepartmentId(
                                                    department._id
                                                );
                                                setNewDepartmentName(
                                                    department.name
                                                );
                                                setShowEditModal(true);
                                            }}
                                        />
                                        <FaTrashAlt
                                            className='hover:cursor-pointer'
                                            onClick={() =>
                                                handleDelete(department._id)
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Department Modal */}
            {showAddModal && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                        <h2 className='text-xl font-semibold mb-4'>
                            Add New Department
                        </h2>
                        <form>
                            <label className='block mb-2 font-medium'>
                                Department Name
                            </label>
                            <input
                                type='text'
                                className='w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
                                value={newDepartmentName}
                                onChange={(e) =>
                                    setNewDepartmentName(e.target.value)
                                }
                            />
                            <div className='flex justify-end space-x-2'>
                                {isCreating && (
                                    <div className='mt-1 mr-2'>
                                        <ClipLoader size={30} />
                                    </div>
                                )}
                                <button
                                    type='button'
                                    className='px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500'
                                    onClick={() => setShowAddModal(false)}
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
                                    onClick={handleAddDepartment}
                                    disabled={isCreating || !isFormValid}
                                >
                                    Add Department
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Department Modal */}
            {showEditModal && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                        <h2 className='text-xl font-semibold mb-4'>
                            Edit Department
                        </h2>
                        <form>
                            <label className='block mb-2 font-medium'>
                                Department Name
                            </label>
                            <input
                                type='text'
                                className='w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
                                value={newDepartmentName}
                                onChange={(e) =>
                                    setNewDepartmentName(e.target.value)
                                }
                            />
                            <div className='flex justify-end space-x-2'>
                                {isUpdating && (
                                    <div className='mt-1 mr-2'>
                                        <ClipLoader size={30} />
                                    </div>
                                )}
                                <button
                                    type='button'
                                    className='px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500'
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type='button'
                                    className={`px-4 py-2 rounded text-white ${
                                        isUpdating || !isFormValid
                                            ? 'bg-blue-300 cursor-not-allowed'
                                            : 'bg-blue-500 hover:bg-blue-600'
                                    }`}
                                    onClick={handleEditDepartment}
                                    disabled={isUpdating || !isFormValid}
                                >
                                    Update Department
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DepartmentListScreen;
