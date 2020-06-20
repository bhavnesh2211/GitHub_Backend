const { Users } = require("../services");
const axios = require("axios");
const auth = require("../middleware/auth");
const CircularJSON = require ("circular-json");
exports.getUser = async (req,res) => {
    let user = new Users()
    let username = req.params.username;
    let cookie = req.headers.cookie;
    if (cookie == undefined) {
        res.send ("Please login fisrtly");
    }else {
        let token = cookie.slice(6);
        let email = await auth.fetch (token)
        await user.getByEmail (email)
        .then ((data) => {
            if (data.length > 0) {
                let url = "https://api.github.com/users/" + username
                axios
                .get(url)
                .then ((data) =>{
                    let githubData = CircularJSON.stringify (data.data);
                    res.send (JSON.parse(githubData));
                }).catch ((err) => {
                    res.send (err+"");
                })
            }res.send ("There is no user with this email");
        }).catch ((err) => {
            res.send (err);
        });
    };  
}

exports.getAllUsers = async (req,res) => {
    let limit = req.query.limit
    console.log (limit)
    let url = "https://api.github.com/users?name"
    axios
        .get(url)
        .then ((data) => {
            let githubData = CircularJSON.stringify (data.data)
            let usersdata = JSON.parse(githubData)
            const user = usersdata.map(a => {
                return a
            })
            let userdata = user.slice(0,limit)
            res.send (userdata)
        }).catch ((err) => {
            res.send (err + "")
        })
}