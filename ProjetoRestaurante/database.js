const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./banco.db');


// Tabelas do SQLite

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT NOT NULL,
      email TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS mesas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numero INTEGER NOT NULL,
      lugares INTEGER NOT NULL,
      status TEXT DEFAULT 'disponivel'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reservas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER NOT NULL,
      mesa_id INTEGER NOT NULL,
      data TEXT NOT NULL,
      hora TEXT NOT NULL,
      FOREIGN KEY(cliente_id) REFERENCES clientes(id),
      FOREIGN KEY(mesa_id) REFERENCES mesas(id)
    )
  `);
});

module.exports = db;
