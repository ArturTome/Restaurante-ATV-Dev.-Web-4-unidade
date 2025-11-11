const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;


// npm init -y
// npm install express sqlite3
// tem que instalar isso para o bamco de dados funcionar

const cliente = require('./models/cliente');
const mesa = require('./models/mesa');
const reserva = require('./models/reserva');

app.use(express.json());

app.get('/clientes', cliente.listar);
app.post('/clientes', cliente.cadastrar);
app.put('/clientes/:id', cliente.editar);
app.delete('/clientes/:id', cliente.excluir);

app.get('/mesas', mesa.listar);
app.post('/mesas', mesa.cadastrar);
app.put('/mesas/:id', mesa.editar);
app.delete('/mesas/:id', mesa.excluir);

app.get('/reservas', reserva.listar);
app.post('/reservas', reserva.cadastrar);
app.put('/reservas/:id', reserva.editar);
app.delete('/reservas/:id', reserva.excluir);

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));