const http = require('http');
const path = require('path');
const status = require('http-status');
const jwt = require ('jsonwebtoken');
const _config = require('../_config');


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
            res.json({msg:"Error!!!!", err:err});
        })
}

const findAll = (req, res) => {
    _user.find()
        .then ((data) =>{
            if(data.length==0){
                res.status(status.NO_CONTENT);
                res.json({msg:"No se encontro usuario"});
            }
            else{
                res.status(status.OK);
                res.json({msg:"Exito!!!", data:data});
            }
        })
        .catch((err) =>{
            res.status(status.BAD_REQUEST);
            res.json({msg:"Error"})
        });
}

const findOne = (req, res) => {
    const {id}=req.params;
    const params = {
        _id:id
    };
    _user.findOne(params)
        .then((data) =>{
            res.status(status.OK);
            res.json({msg:"Exito!!!",data:data});
        })
        .catch((err) =>{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error!!! No se encontro",err:err})
        });
}

const deleteByID = (req,res) =>{
    const {id} = req.params;

    const params={
        _id:id
    };
    _user.findByIdAndRemove(params)
        .then((data) =>{
                res.status(status.OK);
                res.json({msg:"Exito!!!",data:data});
        })
        .catch((err) =>{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error!!! No se encontro",err:err})
        });
}

const updateById = (req,res) =>{
    const {id} = req.params;
    const user = req.body;

    const params = {
        _id:id
    }
    
    _user.findByIdAndUpdate(params,user)
        .then((data)=>{
            res.status(status.OK);
            res.json({msg:"Update correcto",data:data});
        })
        .catch((err)=>{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error, documento no actualizado",err:err});
        })
}

const login = (req , res) => {
    const {email,password} = req.params;
    let query = {email:email,password:password};
    _user.findOne(query,"-password")
    .then((user) => {
        if(user){
            const token = jwt.sign({email:email},_config.SECRETJWT);
            res.status(status.OK);
            res.json({
            msg:"acceso exitoso",
            data:{
                user:user,
                token:token
            }
             });
        } else{
            res.status(status.NOT_FOUND);
            res.json({msg:"error"})
        }
    })
    .catch((err)=>{
        res.status(status.BAD_REQUEST);
        res.json({msg:"NO SE ENCOTNRO!!!"});
    });
};
//--CODIGO .CSV
const csvFilePath='C:\\Users\\Pc\\Desktop\\aplicaciones empresariales\\U_3\\eje02_u3\\datos2.csv'
const csv=require('csvtojson');


const CreateUserCSV= async (req, res) => {
    csv()
    .fromFile(csvFilePath).then((jsonObj)=>{
        res.status(402);
        console.log(jsonObj);
        _user.create(jsonObj)
        .then((jsonObj)=> {
            
            res.status(200);
            res.json({msg:"USUARIOS CREADOS ", jsonObj: jsonObj});
        
        })
        .catch((err)=> {
            
            res.status(400);
            res.json({msg:"ERROR AL CREAR LOS USARIOS", data:err});
       
        })
    }).catch((err) => {
        
        res.status(402);
    })
    const jsonArray= await csv().fromFile(csvFilePath);
}
//----------------------------------------



module.exports = (User) => {
    _user = User;
    return({
        createUser,
        findAll,
        deleteByID,
        updateById,
        findOne,
        login,
        CreateUserCSV
    });
}