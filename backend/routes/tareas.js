const express= require('express');
const jwt = require('jsonwebtoken');
//-------------------
const bcrypt = require('bcrypt')
//-------------------
const rutas = express.Router();

const usuario = require('../models/usuario')

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
})

//Otras tareas

module.exports= rutas;