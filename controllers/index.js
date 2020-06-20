const register = require ("./register")
const login = require ("./login")
const getUsers = require ("./getUser").getUser
const getAllUsers = require ("./getUser").getAllUsers

module.exports = {
    register,
    login,
    getUsers,
    getAllUsers
}