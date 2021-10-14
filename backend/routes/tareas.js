const express= require('express');
const jwt = require('jsonwebtoken');
//-------------------
const bcrypt = require('bcrypt');
//-------------------
const rutas = express.Router();

const usuario = require('../models/usuario');
const recetas = require("../models/recetas.js");
const { restart } = require('nodemon');

//Registrar usuario

rutas.post('/registrar-usuario', async (req,res, next) =>{
    const userExist= await usuario.findOne({usuario: req.body.usuario});
    if(userExist){
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

/* rutas.get('/login', async (req,res)=> {
    try{
        const user= await usuario.find();
        res.json(user);
    } catch {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
}) */
rutas.post('/login', async (req,res)=>{
    const user= await usuario.findOne({usuario: req.body.usuario});
    if(!user){
        return res.status(404).json({error: 'El usuario no está registrado'});
    }

    const validPassword= await bcrypt.compare(req.body.password, user.password);

    if(!validPassword){
        return res.status(401).json({error: 'La contraseña no es valida'});
    }

    res.json({
        error: null,
        data: 'Inicio exitoso'
    });

    const token = jwt.sign({
        usuario: user.usuario,
        id: user._id
    }, "Inf0rmaci0n_Usuario");

    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })
})

//Agregar recetas
rutas.post('/Recetas', async (req,res)=> {
    try{
        const recetasDB = await recetas.create(req.body);
        res.status(200).json(recetasDB);
    } catch {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

//Otras tareas


module.exports= rutas;