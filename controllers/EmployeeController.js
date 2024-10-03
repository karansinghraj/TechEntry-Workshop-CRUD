const employeeService = require("../services/EmployeeService");

const getAllEmployeesController = async(req, res) => {
    const model = req.query;
    console.log(model)
    const response = await employeeService.getAllEmployees(model);
    res.json(response)
}

const createEmployeeController = async(req, res) => {
    const model = req.body;
    const response = await employeeService.createEmployee(model);
    console.log(response)
    res.json(response);
}

const updateEmployeeController = async(req, res) => {
    const model = req.body;
    const response = await employeeService.updateEmployee(model);
    console.log(response)
    res.json(response);
}

const deleteEmployeeController = async(req, res) => {
    const model = req.query;
    const response = await employeeService.deleteEmployee(model);
    console.log(response)
    res.json(response);
}


module.exports = {
    createEmployeeController,
    getAllEmployeesController,
    updateEmployeeController,
    deleteEmployeeController
}