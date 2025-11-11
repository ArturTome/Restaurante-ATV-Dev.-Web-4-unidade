const db = require('../database');

// Listar mesas
exports.listar = (req, res) => {
  db.all('SELECT * FROM mesas', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
};

// Criar mesa
exports.cadastrar = (req, res) => {
  const { numero, lugares } = req.body;
  db.run(
    'INSERT INTO mesas (numero, lugares, status) VALUES (?, ?, "disponivel")',
    [numero, lugares],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ id: this.lastID, numero, lugares, status: 'disponivel' });
    }
  );
};

// Editar mesa
exports.editar = (req, res) => {
  const { id } = req.params;
  const { numero, lugares, status } = req.body;

  db.run(
    'UPDATE mesas SET numero = ?, lugares = ?, status = ? WHERE id = ?',
    [numero, lugares, status, id],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ mensagem: 'Mesa atualizada com sucesso!' });
    }
  );
};

// Excluir mesa
exports.excluir = (req, res) => {
  const { id } = req.params;

  // Impede excluir mesa com reserva ativa
  db.get('SELECT * FROM reservas WHERE mesa_id = ?', [id], (err, row) => {
    if (row) return res.status(400).json({ erro: 'Mesa possui reserva ativa!' });

    db.run('DELETE FROM mesas WHERE id = ?', [id], function (err2) {
      if (err2) return res.status(500).json({ erro: err2.message });
      res.json({ mensagem: 'Mesa excluída com sucesso!' });
    });
  });
};
