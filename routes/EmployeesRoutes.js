const express = require('express');
const { createEmployeeController, getAllEmployeesController, updateEmployeeController, deleteEmployeeController } = require('../controllers/EmployeeController');
const employeeRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Employee Management APIs
 *   description: Endpoints for managing employee records
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get All Employees
 *     description: Retrieve a list of all employees.
 *     tags: [Employee Management APIs]
 *     responses:
 *       '200':
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Employees retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       position:
 *                         type: string
 *                         example: "Software Engineer"
 *                       department:
 *                         type: string
 *                         example: "Engineering"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
employeeRouter.get('/', getAllEmployeesController)

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create Employee
 *     description: Add a new employee to the system.
 *     tags: [Employee Management APIs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The full name of the employee.
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 description: The email address of the employee.
 *                 example: "janedoe@example.com"
 *               phone:
 *                 type: string
 *                 description: The phone number of the employee.
 *                 example: "+1234567890"
 *               designation:
 *                 type: string
 *                 description: The job title of the employee.
 *                 example: "Project Manager"
 *               isActive:
 *                 type: boolean
 *                 description: Indicates if the employee is currently active.
 *                 example: true
 *     responses:
 *       '201':
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Employee created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123"
 *       '400':
 *         description: Bad Request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Invalid input data
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
employeeRouter.post('/', createEmployeeController)

/**
 * @swagger
 * /employees:
 *   put:
 *     summary: Update Employee
 *     description: Update an existing employee's details.
 *     tags: [Employee Management APIs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: id of the employee.
 *                 example: "Jfcewe3q2ec4Dcx2DWfsd"
 *               name:
 *                 type: string
 *                 description: The full name of the employee.
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 description: The email address of the employee.
 *                 example: "janedoe@example.com"
 *               phone:
 *                 type: string
 *                 description: The phone number of the employee.
 *                 example: "+1234567890"
 *               designation:
 *                 type: string
 *                 description: The job title of the employee.
 *                 example: "Project Manager"
 *               isActive:
 *                 type: boolean
 *                 description: Indicates if the employee is currently active.
 *                 example: true
 *     responses:
 *       '200':
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Employee updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123"
 *       '404':
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Employee not found
 *       '400':
 *         description: Bad Request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Invalid input data
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
employeeRouter.put('/', updateEmployeeController);

/**
 * @swagger
 * /employees:
 *   delete:
 *     summary: Delete Employee
 *     description: Delete an employee from the system.
 *     tags: [Employee Management APIs]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: The ID of the employee to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Employee deleted successfully
 *       '404':
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Employee not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
employeeRouter.delete('/', deleteEmployeeController);

module.exports = {employeeRouter};