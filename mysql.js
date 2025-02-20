const mysql = require('mysql');


const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao MySQL:', error);
    return;
  }
  console.log('Conectado ao MySQL');
});


function get_colaboradores(query){
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
        if (error) {
            reject(error);
            return;
        }
        resolve(results);
        });
    });
}

function get_colaborador_by_id(query, id){
    return new Promise((resolve, reject) => {
        connection.query(query, id, (error, results) => {
        if (error) {
            reject(error);
            return;
        }
        resolve(results);
        });
    });
}

function finish_connection(){
    connection.end();
}

module.exports = connection;