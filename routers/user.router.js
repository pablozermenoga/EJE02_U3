const router = require('express').Router();

module.exports = (wagner) => {
    
    const userCtrl = wagner.invoke((User) => 
        require('../controllers/user.controller')(User));

    router.post('/', (req, res) =>
        userCtrl.createUser(req, res));

    return router;
}