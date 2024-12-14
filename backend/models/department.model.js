import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const departmentSchema = Schema(
    {
        name: { type: String, required: true },
    },
    { timestamps: true }
);

const Department = mongoose.model('Department', departmentSchema);

export default Department;