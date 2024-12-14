import express from 'express';
import { createEmployee, deleteEmployee, getAllEmployees, getSingleEmployee, updateEmployee } from '../controllers/employee.controller.js';
const router = express.Router();

router.route('/').get(getAllEmployees).post(createEmployee);
router.route('/:id').get(getSingleEmployee).put(updateEmployee).delete(deleteEmployee);

export default router;