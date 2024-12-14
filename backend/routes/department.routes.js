import express from 'express';
import { createDepartment, deleteDepartment, getAllDepartments, getSingleDepartment, updateDepartment } from '../controllers/department.controller.js';
const router = express.Router();

router.route('/').get(getAllDepartments).post(createDepartment);
router.route('/:id').get(getSingleDepartment).put(updateDepartment).delete(deleteDepartment);

export default router;