import expressAsyncHandler from 'express-async-handler';
import Department from '../models/department.model.js';

// @desc    Get all departments
// @route   GET api/departments
// @access  Public
export const getAllDepartments = expressAsyncHandler(async (req, res) => {
    try {
        const departments = await Department.find({});
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Server error retrieving departments', error });
    }
});

// @desc    Get single department
// @route   GET api/departments/:id
// @access  Public
export const getSingleDepartment = expressAsyncHandler(async (req, res) => {
    const department = await Department.findById(req.params.id);
    if (department) {
        res.json(department);
    } else {
        res.status(404);
        throw new Error('Department not found');
    }
});

// @desc    Create department
// @route   POST api/departments
// @access  Private
export const createDepartment = expressAsyncHandler(async (req, res) => {
    const { name } = req.body;
    const department = new Department({ name });
    const createdDepartment = await department.save();
    res.status(201).json(createdDepartment);
});

// @desc    Update department
// @route   PUT api/departments/:id
// @access  Private
export const updateDepartment = expressAsyncHandler(async (req, res) => {
    const { name } = req.body;
    const department = await Department.findById(req.params.id);
    if (department) {
        department.name = name || department.name;
        const updatedDepartment = await department.save();
        res.json(updatedDepartment);
    } else {
        res.status(404);
        throw new Error('Department not found');
    }
});

// @desc    Delete department
// @route   DELETE api/departments/:id
// @access  Private
export const deleteDepartment = expressAsyncHandler(async (req, res) => {
    const department = await Department.findById(req.params.id);
    if (department) {
        await department.deleteOne();
        res.json({ message: 'Department removed' });
    } else {
        res.status(404);
        throw new Error('Department not found');
    }
});
