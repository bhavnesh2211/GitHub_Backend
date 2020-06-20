const auth = require ("../middleware/auth");

const knex = require ("../knex");

class Users {
    async getByEmail (email) {
        return knex("users").where("email_id" ,email)
    };
    async insertIntoDb (userData){
        return knex("users").insert(userData)
    };  
};

module.exports = Users;