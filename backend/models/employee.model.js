import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const employeeSchema = Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        department: {type: Schema.Types.ObjectId, ref: 'Department', required: true}
    },
    { timestamps: true }
);

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;