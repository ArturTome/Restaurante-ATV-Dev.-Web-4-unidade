const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const db = require('./database');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs.engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/desenvolvedores', (req, res) => {
  res.render('desenvolvedores');
});

app.get('/cliente', (req, res) => {
  db.all('SELECT * FROM clientes', [], (err, clientes) => {
    if (err) return res.status(500).send('Erro ao buscar clientes');
    res.render('cliente/listar', { clientes });
  });
});

app.get('/cliente/cadastrar', (req, res) => {
  res.render('cliente/cadastrar');
});

app.post('/cliente/cadastrar', (req, res) => {
  const { nome, telefone, email } = req.body;
  db.run(
    'INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)',
    [nome, telefone, email],
    (err) => {
      if (err) return res.status(500).send('Erro ao cadastrar cliente');
      res.redirect('/cliente');
    }
  );
});

app.get('/cliente/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM clientes WHERE id = ?', [id], (err, cliente) => {
    if (err || !cliente) return res.status(404).send('Cliente não encontrado');
    res.render('cliente/detalhar', { cliente });
  });
});

app.get('/cliente/:id/editar', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM clientes WHERE id = ?', [id], (err, cliente) => {
    if (err || !cliente) return res.status(404).send('Cliente não encontrado');
    res.render('cliente/editar', { cliente });
  });
});

app.post('/cliente/:id/editar', (req, res) => {
  const { id } = req.params;
  const { nome, telefone, email } = req.body;
  db.run(
    'UPDATE clientes SET nome=?, telefone=?, email=? WHERE id=?',
    [nome, telefone, email, id],
    (err) => {
      if (err) return res.status(500).send('Erro ao atualizar cliente');
      res.redirect('/cliente');
    }
  );
});

app.post('/cliente/:id/deletar', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM clientes WHERE id=?', [id], (err) => {
    if (err) return res.status(500).send('Erro ao deletar cliente');
    res.redirect('/cliente');
  });
});

app.get('/mesa', (req, res) => {
  db.all('SELECT * FROM mesas', [], (err, mesas) => {
    if (err) return res.status(500).send('Erro ao buscar mesas');
    res.render('mesa/listar', { mesas });
  });
});

app.get('/mesa/cadastrar', (req, res) => {
  res.render('mesa/cadastrar');
});

app.post('/mesa/cadastrar', (req, res) => {
  const { numero, lugares } = req.body;
  db.run(
    'INSERT INTO mesas (numero, lugares) VALUES (?, ?)',
    [numero, lugares],
    (err) => {
      if (err) return res.status(500).send('Erro ao cadastrar mesa');
      res.redirect('/mesa');
    }
  );
});

app.get('/mesa/:id/editar', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM mesas WHERE id = ?', [id], (err, mesa) => {
    if (err || !mesa) return res.status(404).send('Mesa não encontrada');
    res.render('mesa/editar', { mesa });
  });
});

app.post('/mesa/:id/editar', (req, res) => {
  const { id } = req.params;
  const { numero, lugares } = req.body;
  db.run(
    'UPDATE mesas SET numero=?, lugares=? WHERE id=?',
    [numero, lugares, id],
    (err) => {
      if (err) return res.status(500).send('Erro ao atualizar mesa');
      res.redirect('/mesa');
    }
  );
});

app.post('/mesa/:id/deletar', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM mesas WHERE id=?', [id], (err) => {
    if (err) return res.status(500).send('Erro ao deletar mesa');
    res.redirect('/mesa');
  });
});

app.get('/reserva', (req, res) => {
  db.all(
    `SELECT r.id, c.nome AS cliente, m.numero AS mesa, r.data_reserva
     FROM reservas r
     JOIN clientes c ON r.cliente_id = c.id
     JOIN mesas m ON r.mesa_id = m.id`,
    [],
    (err, reservas) => {
      if (err) return res.status(500).send('Erro ao buscar reservas');
      res.render('reserva/listar', { reservas });
    }
  );
});

app.get('/reserva/cadastrar', (req, res) => {
  db.all('SELECT * FROM clientes', [], (err, clientes) => {
    db.all('SELECT * FROM mesas', [], (err2, mesas) => {
      if (err || err2) return res.status(500).send('Erro ao carregar dados');
      res.render('reserva/cadastrar', { clientes, mesas });
    });
  });
});

app.post('/reserva/cadastrar', (req, res) => {
  const { cliente_id, mesa_id, data_reserva } = req.body;
  db.run(
    'INSERT INTO reservas (cliente_id, mesa_id, data_reserva) VALUES (?, ?, ?)',
    [cliente_id, mesa_id, data_reserva],
    (err) => {
      if (err) return res.status(500).send('Erro ao cadastrar reserva');
      res.redirect('/reserva');
    }
  );
});

app.post('/reserva/:id/deletar', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM reservas WHERE id=?', [id], (err) => {
    if (err) return res.status(500).send('Erro ao deletar reserva');
    res.redirect('/reserva');
  });
});

app.listen(port, () => {
  console.log(`Servidor em execução: http://localhost:${port}`);
});
