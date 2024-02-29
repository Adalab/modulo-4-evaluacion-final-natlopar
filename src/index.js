const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const server = express();

server.use(cors());
server.use(express.json());

const port = process.env.PORT || 4500;

async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: 'favourite_music',
  });
  connection.connect();
  return connection;
}

server.listen(port, () => {
  console.log(`Servidor escuchando por http://localhost:${port}`);
});

//endpoints

server.post('/album', async (req, res) => {
  const data = req.body;
  const { nombreAlbum, nombreGrupo, año, duracion, genero } = data;
  const connection = await getConnection();
  const sqlInsert =
    'insert into album (nameAlbum, nameBand, yearAlbum, length, gendre) values (?,?,?,?,?)';
  const [result] = await connection.query(sqlInsert, [
    nombreAlbum,
    nombreGrupo,
    año,
    duracion,
    genero,
  ]);
  console.log(result);
  res.json({
    success: true,
    idNewAlbum: result.insertId,
  }); //id que generó MYSQL para la nueva fila
});

server.get('/albums', async (req, res) => {
  const connection = await getConnection();
  const sql = 'select * from album';
  const [result] = await connection.query(sql);
  res.json({
    success: true,
    result: result,
  });
});

// //obtener receta por ID. pruebo en navegador con localhost:4000/recetas/1

// server.get('/recetas/:id', async (req, res) => {
//     const idReceta = req.params.id;
//     const connection = await getConnection();

//     if(isNaN(parseInt(idReceta))) {
//         return res.json({success: false, error: 'el id debe ser un numero'})
//     }
//     const sql = 'select * from recetas where id = ?';
//     const [result] = await connection.query(sql, [idReceta]);
//     connection.end();
//     if(result.length === 0){
//         return res.json({ success: true, message: 'id no existe'})
//     }
//     res.json({success: true, receta: result[0]});
// });

// //PUT = MODIFICAR UN REGISTRO

server.put('/album/:id', async (req, res) => {
  try {
    const connection = await getConnection();
    const id = req.params.id;
    const data = req.body;
    const { nombreAlbum, nombreGrupo, año, duracion, genero } = data;
    const sql =
      'update album set nameAlbum = ?, nameBand = ?, yearAlbum = ?, length = ?, gendre = ? where idAlbum = ?';
    const [result] = await connection.query(sql, [
      nombreAlbum,
      nombreGrupo,
      año,
      duracion,
      genero,
      id,
    ]);
    res.json({
      success: true,
      message: 'álbum actualizado con éxito',
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'ha ocurrido un error en la modificación del álbum',
    });
  }
});

server.delete('/album', async (req, res) => {
  try {
    const connection = await getConnection();
    const idAlbum = req.query.id;
    const sql = 'delete from album where idAlbum = ?';
    const [result] = await connection.query(sql, [idAlbum]);
    if (result.affectedRows > 0) {
      res.json({
        success: true,
        message: 'eliminado correctamente',
      });
    } else {
      res.json({
        success: false,
        message: 'no se ha podido eliminar',
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: 'ha ocurrido un error en la petición',
    });
  }
});
