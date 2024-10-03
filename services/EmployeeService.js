const Employees = require("../models/Employee");

const createEmployee = async (model) => {
    console.log('model', model);
    try {
        await Employees.create(model);
        return {
            status: 201,
            message: 'Employee created successfully',
        };
    } catch (error) {
        console.log('error:', error.message);
        return {
            status: 500,
            message: 'Internal server error',
        };
    }
};

const getAllEmployees = async (model) => {
    try {
        let allEmployees;
        let { id } = model;
        if (id) {
            allEmployees = await Employees.findOne({ _id: id });
        } else {
            allEmployees = await Employees.find();
        }
        return {
            data: allEmployees,
            message: 'Success',
            status: 200,
        };
    } catch (error) {
        return {
            data: null,
            message: 'Internal server error',
            status: 500,
        };
    }
};


const updateEmployee = async (model) => {
    try {
        const { id, ...updateData } = model; // Extract id and the rest of the update data
        const updatedEmployee = await Employees.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updatedEmployee) {
            return {
                status: 404,
                message: 'Employee not found',
            };
        }
        return {
            status: 200,
            message: 'Employee updated successfully',
            data: updatedEmployee,
        };
    } catch (error) {
        console.log('error:', error.message);
        return {
            status: 500,
            message: 'Internal server error',
        };
    }
};

const deleteEmployee = async (model) => {
    console.log("odel", model)
    try {
        const deletedEmployee = await Employees.findByIdAndDelete({_id: model.id});
        if (!deletedEmployee) {
            return {
                status: 404,
                message: 'Employee not found',
            };
        }
        return {
            status: 204,
            message: 'Employee deleted successfully',
        };
    } catch (error) {
        console.log('error:', error.message);
        return {
            status: 500,
            message: 'Internal server error',
        };
    }
};

module.exports = { createEmployee, getAllEmployees, updateEmployee, deleteEmployee };