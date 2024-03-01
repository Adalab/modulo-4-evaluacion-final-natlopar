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

//endpoints. añadir un album a la bd

server.post('/album', async (req, res) => {
  try {
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
    res.status(200).json({
      success: true,
      idNewAlbum: result.insertId,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'no se ha podido añadir el álbum',
    });
  }
});


//obtener todos los albums

server.get('/albums', async (req, res) => {
  try {
    const connection = await getConnection();
    const sql = 'select * from album';
    const [result] = await connection.query(sql);
    res.status(200).json({
      success: true,
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'no se han podido obtener los álbums',
    });
  }
});

//filtrar por nombre de Album o por género musical

server.get('/album', async (req, res) => {
  try {
    const connection = await getConnection();
    const nameBand = req.query.nameBand;
    const gendre = req.query.gendre;
    const sql = 'select * from album where nameBand = ? or gendre = ?';
    const [result] = await connection.query(sql, [nameBand, gendre]);
    connection.end();
    if (result.length === 0) {
      return res.json({
        success: true,
        message: 'grupo no registrado en este listado',
      });
    }
    res.status(200).json({ success: true, albums: result });
  } catch (error) {
    res.json({ success: false, message: 'error obteniendo datos' });
  }
});

//actualizar un album existente


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
    res.status(200).json({
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

//eliminar un álbum

server.delete('/album', async (req, res) => {
  try {
    const connection = await getConnection();
    const idAlbum = req.query.id;
    const sql = 'delete from album where idAlbum = ?';
    const [result] = await connection.query(sql, [idAlbum]);
    if (result.affectedRows > 0) {
      res.status(200).json({
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
