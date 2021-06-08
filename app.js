const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();

const dbClient = new Client({
    connectionString: "postgresql://postgres:admin@localhost:5432/LibreriaNacional"
});

/** Conexión a BD */
dbClient.connect(err => {
    if (err) console.log(err);
    else console.log('Conexión a PostgreSQL exitosa!!');
});

/** Middleware */
app.use(cors());
app.use(express.json());


app.get('/', (request,response) => {
    response.send({message: 'Servidor corriendo...'});
});

app.get('/usuarios', (request, response) => {
    //const querySQL = 'SELECT * FROM usuarios';
    const querySQL = 'SELECT * FROM usuarios';
    dbClient.query(querySQL, (error, db_response) => {
        if (error) {
            console.log(error);
            res = {data:[],status: 500, message: 'Problema interno en el servidor'}
        }
        else {
            if(db_response.rowCount == 0) {
                res = { data: [], status: 404, message: 'No se encontraron usuarios'};
            }
            else {
                res = { data: db_response.rows, status: 200, message: 'Se encontraron usuarios'};
            }
            console.log(db_response);
        }
        response.json(res);
    });
});

app.post('/users', (request,response) => {
    const user = request.body.user;
    //console.log(body);
    response.json({message: user});
});


app.listen(5050, () => {
    console.log('El servidor inició por el puerto 5050');
});