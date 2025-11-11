const db = require('../database');

// Listar clientes
exports.listar = (req, res) => {
  db.all('SELECT * FROM clientes', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
};

// Criar cliente
exports.cadastrar = (req, res) => {
  const { nome, telefone, email } = req.body;
  db.run(
    'INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)',
    [nome, telefone, email],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ id: this.lastID, nome, telefone, email });
    }
  );
};

// Editar cliente
exports.editar = (req, res) => {
  const { id } = req.params;
  const { nome, telefone, email } = req.body;

  db.run(
    'UPDATE clientes SET nome = ?, telefone = ?, email = ? WHERE id = ?',
    [nome, telefone, email, id],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ mensagem: 'Cliente atualizado com sucesso!' });
    }
  );
};

// Excluir cliente
exports.excluir = (req, res) => {
  const { id } = req.params;

  // Evita excluir cliente com reservas ativas
  db.get('SELECT * FROM reservas WHERE cliente_id = ?', [id], (err, row) => {
    if (row) return res.status(400).json({ erro: 'Cliente possui reserva ativa!' });

    db.run('DELETE FROM clientes WHERE id = ?', [id], function (err2) {
      if (err2) return res.status(500).json({ erro: err2.message });
      res.json({ mensagem: 'Cliente excluído com sucesso!' });
    });
  });
};
