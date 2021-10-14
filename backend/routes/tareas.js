const express= require('express');
const jwt = require('jsonwebtoken');
//-------------------
const bcrypt = require('bcrypt')
//-------------------
const rutas = express.Router();

const usuario = require('../models/usuario');
const recetas = require("../models/recetas.js");
const { restart } = require('nodemon');

//Registrar usuario

rutas.post('/registrar-usuario', async (req,res, next) =>{
    const userExist= await usuario.findOne({usuario: req.body.usuario});
    if(userExist == true){
        return res.status(400).json({error: 'El usuario ya está registrado'})
    }
    const encrypt= await bcrypt.genSalt(10);
    const password= await bcrypt.hash(req.body.password, encrypt);

    const user= new usuario({
        usuario: req.body.usuario,
        password: password
    });

    usuario.create(user, (error, data)=>{
        if(error){
            return next(error);
        }else{
            console.log(data);
            res.json(data);
        }
    });
    
});

//Logear

rutas.get('/login', async (req,res)=> {
    try{
        const user= await usuario.find();
        res.json(user);
    } catch {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
})

//recetas
rutas.post('/Recetas', async (req,res)=> {
    try{
        const recetasDB = await recetas.create(req.body);
        res.status(200).json(recetasDB);
    } catch {
        return 
            res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

//Otras tareas


module.exports= rutas;