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

//Lectura y parseo del Body
app.use(express.json());

//Base de Datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen( process.env.PORT , () => {
    console.log("Server running on port "+ process.env.PORT);
})