const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_untels_biblio',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function TestConexion(){
  try {
      const connect = await db.getConnection();
      console.log('Conectado a la base de datos.');
      connect.release()
  } catch (error) {
    console.log('ERROR, no se conecto a la BD: '+ error.message);
  }
}
TestConexion()

module.exports = db;