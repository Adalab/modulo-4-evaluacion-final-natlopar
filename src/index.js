//dependecias q necesito: express, cors, mysql2, dotenv
//configurar el servidor: importo las dependencias con las q voy a trabajar:
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const api = express();

api.use(cors());
api.use(express.json());

const port = process.env.PORT || 4500;//esto lo necesito para subir al render

async function getConnection () {
    const connection = await mysql.createConnection({
        host: process.env.HOST || 'localhost', 
        user: process.env.DB_USER || 'root', 
        password: process.env.DB_PASS || 'root',
        database: 'recetas_db'
    })
    connection.connect();
    return connection;
};

api.listen(port, () => {
    console.log(`Servidor escuchando por http://localhost:${port}`);
});

//endpoints

//obtener todas las recetas. GET

api.get('/recetas', async (req, res) => {
    const connection = await getConnection();
    const sqlRecetas = 'select * from recetas';
    const [resultRecetas] = await connection.query(sqlRecetas);
    const countRecetas = resultRecetas.length; //me piden el número de elementos que tengo 

    res.json({
        info: {count: countRecetas},
        results: resultRecetas});//listado total de recetas
})

//obtener receta por ID. pruebo en navegador con localhost:4000/recetas/1

api.get('/recetas/:id', async (req, res) => {
    const idReceta = req.params.id; 
    const connection = await getConnection();
   
    if(isNaN(parseInt(idReceta))) {
        return res.json({success: false, error: 'el id debe ser un numero'})
    }
    const sql = 'select * from recetas where id = ?';
    const [result] = await connection.query(sql, [idReceta]);
    connection.end();
    if(result.length === 0){
        return res.json({ success: true, message: 'id no existe'})
    }
    res.json({success: true, receta: result[0]});
});

api.post ('/recetas', async (req, res) => {
    const data = req.body;
    const {nombreReceta, ingredientesReceta, instruccionesReceta} = data;
    const connection = await getConnection();
    const sqlInsert = 'insert into recetas (nombre, ingredientes, instrucciones) values (?,?,?)';
    const [result] = await connection.query(sql, [nombreReceta, ingredientesReceta, instruccionesReceta]);
    console.log(result);
    res.json({
        success: true, 
        id: result.insertId}) //id que generó MYSQL para la nueva fila
});

//PUT = MODIFICAR UN REGISTRO

api.put('/recetas', async (req, res) => {
    try{
        const connection = await getConnection();
        const id= req.params.id;
        const data = req.body;
        const {nombreReceta, ingredientesReceta, instruccionesReceta} = data;
        const sql = 'update recetas set nombre = ?, ingredientes =?, instrucciones = ? where id = ?';
        const [result] = await connection.query(sql, [
            nombreReceta, ingredientesReceta, instruccionesReceta, id
        ]);
        res.json({
            success: true, 
            message: 'receta actualizada correctamente'
        })
    } catch (error) {
        console.log(error)
    }
});


//para el delete vamos a pasar la info por query params

api.delete('/recetas', async (req, res) => {
    const connection = await getConnection();
    const idReceta = req.query.id;
    const sql = 'delete from recetas where id = ?'
    const [result] = await connection.query(sql, [idReceta]);
    console.log(result);
    if (result.affectedRows > 0) {
        res.json({
            success: true, 
            message: 'eliminado correctamente'
        })
    } else {
        res.json({
            success: false, 
            message: 'no se ha eliminado nada'
        })
    }
    //aquí haría un try catch
   
})