//mean_user
//0rTlkGr0Zm1cXK57
require('dotenv').config();

//Imports
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/config');

// Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Base de Datos
dbConnection();

// Rutas
app.get( '/', (req, res) => {

    res.json({

        ok: true,
        msg: 'Hola Mundo'

    });

} );

app.listen( process.env.PORT , () => {
    console.log("Server running on port "+ process.env.PORT);
})