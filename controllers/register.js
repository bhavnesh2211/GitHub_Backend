const Joi = require ("joi");
const {Users} = require ("../services");
const validator = require("email-validator");
const schema = Joi.object().keys({
    email_id : Joi.string().required(),
    name : Joi.string().required(),
    phone_number : Joi.string().required(),
    password : Joi.string().required()
})
module.exports = async (req,res) => {
    let users = new Users()
    let userdata = req.body;
    if (userdata.password.length < 8){
        res.send ("Password must be in minimun 8 characters")
        return;
    };
    Joi.validate (userdata, schema, async (err, value) => {
        if (!err) {
            if (validator.validate(userdata.email_id)) {
                await users.getByEmail(userdata.email_id)
                .then (async (data) => {
                    if (data.length == 0) {
                        await users.insertIntoDb(userdata)
                        .then ((result) => {
                            res.send (result);
                            return;
                        }).catch ((err) => {
                            res.send (err);
                            return;
                        });
                    }res.send ("User with this email id already exists");
                    return;
                }).catch ((err) => {
                    res.send (err);
                    return;
                });
            }res.send ("Please check correct your email");
            return
        }res.send ("Please filled all fields that are given")
    })
     
}
