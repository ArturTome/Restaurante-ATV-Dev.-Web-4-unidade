const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path')
const app = express();
const port = 3000;


// npm init -y
// npm install express sqlite3
// tem que instalar isso para o bamco de dados funcionar
// npm install express-handlebars


app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));




const cliente = require('./models/cliente');
const mesa = require('./models/mesa');
const reserva = require('./models/reserva');

app.use(express.json());

app.get('/clientes', cliente.listar);
app.post('/clientes', cliente.cadastrar);
app.put('/clientes/:id', cliente.editar);
app.delete('/clientes/:id', cliente.excluir);
app.get('/clientes-view', cliente.renderizarPagina);


app.get('/mesas', mesa.listar);
app.post('/mesas', mesa.cadastrar);
app.put('/mesas/:id', mesa.editar);
app.delete('/mesas/:id', mesa.excluir);

app.get('/reservas', reserva.listar);
app.post('/reservas', reserva.cadastrar);
app.put('/reservas/:id', reserva.editar);
app.delete('/reservas/:id', reserva.excluir);

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));