const express= require('express');
const rutas = express.Router();

const usuario = require('../models/usuario')

//Registrar usuario

rutas.post('/registrar-usuario', async (req,res) =>{
    const body= req.body;

    try{

        const userDB= await usuario.create(body);
        res.status(200).json(userDB)

    }catch(error){

        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            err
        })

    }
})

//Otras tareas

module.exports= rutas;