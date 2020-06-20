const Joi = require("joi");
const { Users } = require("../services");
const validator = require("email-validator");
const auth = require("../middleware/auth");

const schema = Joi.object().keys({
    email_id : Joi.string().required(),
    password : Joi.string().required()
})

module.exports = async (req, res) => {
    let user = new Users();
    userdata = req.body;
    Joi.validate (userdata, schema, async (error, value) => {
        if (!error) {
            if (validator.validate(userdata.email_id)) {
                await user.getByEmail (userdata.email_id)
                .then (async (data) => {
                    console.log(data)
                    if (data.length == 0) {
                        res.send ("Please check your email");
                        return false
                    }if (data[0].password != userdata.password) {
                        res.send ("Kindly check your password it's incorrect");
                        return false
                    }
                    let token = await auth.create(data[0].email_id)
                    res.cookie ("Token", token);
                    res.send ("You have login sucessfully");
                    return false;
                }).catch ((err) => {
                    res.send (err+"");
                    return;
                });
            }
            res.send ("Please check your email that you have enter");
            return;
        }
        res.send ("Please filled all fields that are given");
    });
};