const RefreshToken = require("../models/RefreshToken");
const Users = require("../models/Users")
const jwt = require('jsonwebtoken');
const secreteKey = 'fjbsd343FWEigWfds45gousrdgo';
const refreshTokenSecreteKey = 'fjbsd343FWEigWfds45gofgdf32DWEusrdgo';
const createUser = async (model) => {
    try {
        let user = await Users.findOne({email: model.email});
        if(user) {
            return {
                status: 500,
                message: 'USER WITH THE GIVEN EMAILID ALREADY EXISTS',
                data: null
            }    
        }
        await Users.create(model);
        return {
            status: 200,
            message: 'SUCCESS',
            data: null
        }
    } catch (error) {
        console.log('Error : ', error.message);
        return {
            status: 500,
            message: 'INTERNAL SERVER ERROR',
            data: null
        }
    }
}

const getUsers = async (model) => {
    try {
        let userData;
        if (model.id) {
            userData = await Users.findOne({ _id: model.id });
        } else {
            userData = await Users.find();
        }
        console.log(userData);
        return {
            status: 200,
            message: 'SUCCESS',
            data: userData
        }
    } catch(error) {
        console.log('Error : ', error.message);
        return {
            status: 500,
            message: 'INTERNAL SERVER ERROR',
            data: null
        }
    }
}

const login = async(model) => {
    try {
        const {email, password} = model;
        const user = await Users.findOne({email: email});
        if(!user) {
            return {
                status: 400,
                message: 'Invalid email or password',
                data: null
            }
        }
        if(user.password !== password) {
            return {
                status: 400,
                message: 'Invalid email or password',
                data: null
            }
        }
        
        // const accessToken = jwt.sign({userId: user._id}, secreteKey, {expiresIn: '1h'});
        const refreshToken = jwt.sign({userId: user._id}, refreshTokenSecreteKey, {expiresIn: '1h'})

        RefreshToken.create({userId: user._id, refreshToken});
        
        return {
            status: 200,
            message: 'LOGGEDIN SUCCESSFULLY',
            accessToken,
        }
    } catch(error) {
        console.log('Error : ', error.message);
        return {
            status: 500,
            message: 'INTERNAL SERVER ERROR',
            data: null
        }
    }
}
module.exports = { createUser, getUsers, login }