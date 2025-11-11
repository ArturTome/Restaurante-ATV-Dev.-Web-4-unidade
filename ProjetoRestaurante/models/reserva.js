const db = require('../database');

// Listar reservas
exports.listar = (req, res) => {
  const query = `
    SELECT r.id, c.nome AS cliente, m.numero AS mesa, r.data, r.hora
    FROM reservas r
    JOIN clientes c ON c.id = r.cliente_id
    JOIN mesas m ON m.id = r.mesa_id
  `;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
};

// Criar reserva
exports.cadastrar = (req, res) => {
  const { cliente_id, mesa_id, data, hora } = req.body;

  // Impede mesa ocupada
  const verifica = `
    SELECT * FROM reservas WHERE mesa_id = ? AND data = ? AND hora = ?
  `;
  db.get(verifica, [mesa_id, data, hora], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (row) return res.status(400).json({ erro: 'Mesa já reservada nesse horário!' });

    db.run(
      'INSERT INTO reservas (cliente_id, mesa_id, data, hora) VALUES (?, ?, ?, ?)',
      [cliente_id, mesa_id, data, hora],
      function (err2) {
        if (err2) return res.status(500).json({ erro: err2.message });

        db.run('UPDATE mesas SET status = "reservada" WHERE id = ?', [mesa_id]);
        res.json({ id: this.lastID, cliente_id, mesa_id, data, hora });
      }
    );
  });
};

// Editar reserva
exports.editar = (req, res) => {
  const { id } = req.params;
  const { data, hora, mesa_id } = req.body;

  // Atualiza reserva e verifica se mesa existe
  db.run(
    'UPDATE reservas SET data = ?, hora = ?, mesa_id = ? WHERE id = ?',
    [data, hora, mesa_id, id],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ mensagem: 'Reserva atualizada!' });
    }
  );
};

// Excluir reserva
exports.excluir = (req, res) => {
  const { id } = req.params;

  db.get('SELECT mesa_id FROM reservas WHERE id = ?', [id], (err, row) => {
    if (row) {
      db.run('UPDATE mesas SET status = "disponivel" WHERE id = ?', [row.mesa_id]);
    }

    db.run('DELETE FROM reservas WHERE id = ?', [id], function (err2) {
      if (err2) return res.status(500).json({ erro: err2.message });
      res.json({ mensagem: 'Reserva excluída e mesa liberada!' });
    });
  });
};
