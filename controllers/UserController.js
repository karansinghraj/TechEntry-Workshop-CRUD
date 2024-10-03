const userService = require('../services/UserService')
const createUserController = async(req, res) => {
    const model = req.body;
    const response = await userService.createUser(model);
    res.json(response);
}

const getUsersController = async(req, res) => {
    const model = req.query;
    const response = await userService.getUsers(model);
    res.status(response.status).json(response);
}

const loginController = async(req, res) => {
    const model = req.body;
    const response = await userService.login(model);
    res.status(response.status).json(response);
}

module.exports = { createUserController, getUsersController, loginController }