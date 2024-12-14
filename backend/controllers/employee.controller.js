import expressAsyncHandler from 'express-async-handler';
import Employee from '../models/employee.model.js';
import Department from '../models/department.model.js';

// @desc    Get all employees
// @route   GET api/employees
// @access  Public
export const getAllEmployees = expressAsyncHandler(async (req, res) => {
    try {
        const employees = await Employee.find({}).populate('department', 'name')
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error retrieving employees', error});
    }
});

// @desc    Get single employee
// @route   GET api/employees/:id
// @access  Public
export const getSingleEmployee = expressAsyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
        res.json(employee);
    } else {
        res.status(404);
        throw new Error('Employee not found');
    }
});

// @desc    Create employee
// @route   POST api/employees
// @access  Private
export const createEmployee = expressAsyncHandler(async (req, res) => {
    const {firstName, lastName, department} = req.body;
    const employee = new Employee({
        firstName,
        lastName,
        department
    });
    const createdEmployee = await employee.save();
    res.status(201).json(createdEmployee);
});

// @desc    Update employee
// @route   PUT api/employees/:id
// @access  Private
export const updateEmployee = expressAsyncHandler(async (req, res) => {
    const {firstName, lastName, department} = req.body;
    const employee = await Employee.findById(req.params.id);
    if (employee) {
        employee.firstName = firstName || employee.firstName;
        employee.lastName = lastName || employee.lastName;
        employee.department = department || employee.department;
        const updatedEmployee = await employee.save();
        res.json(updatedEmployee);
    } else {
        res.status(404);
        throw new Error('Employee not found');
    }
});

// @desc    Delete employee
// @route   PUT api/employees/:id
// @access  Private
export const deleteEmployee = expressAsyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
        await employee.deleteOne();
        res.json({message: 'Employee removed'});
    } else {
        res.status(404);
        throw new Error('Employee not found'); 
    }
});