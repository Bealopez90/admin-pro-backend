const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({

        ok: true,
        usuarios

    });
}

const crearUsuario = async(req, res = response) => {
    const { email, password } = req.body;
    try {

        const existeEmail = await Usuario.findOne({ email });

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Duplicated email, email already exists in database.'
            });
        }
        const usuario = new Usuario( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar Usuario
        await usuario.save();

        //Generate token -> JWT
        const token = await generateJWT( usuario.id );
        

        res.json({

            ok: true,
            usuario,
            token

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error, read logs.'
        });
    }
}

const updateUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if(!usuarioDB){
            res.status(404).json({
                ok: false,
                msg: 'User ID does not exist.'
            })
        }
        //Actualizaciones
        const {password, google, email, ...campos} = req.body;

        if(usuarioDB.email !== email){

            const existeEmail = await Usuario.findOne({ email });
            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'User email already exists.'
                })
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new:true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error.'
        });
    }
}

const deleteUsuario = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById( uid );

        if(!usuarioDB){
            res.status(404).json({
                ok: false,
                msg: 'User ID does not exist.'
            })
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Deleted user.'
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error.'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    updateUsuario,
    deleteUsuario
}