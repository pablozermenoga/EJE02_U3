const http = require('http');
const path = require('path');

let _user;

const createUser = (req, res) => {
    const user = req.body;

    _user.create(user)
        .then((data)=> {
            res.status(200);
            res.json({msg:"Usuario creado correctamente", data: data});
        })
        .catch((err)=> {
            res.status(400);
            res.json({msg:"Error!!!!", data:err});
        })
}

module.exports = (User) => {
    _user = User;
    return({
        createUser
    });
}
