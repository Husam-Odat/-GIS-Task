// npm i body - parser express sqlite3

// establish connection with database
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./maps.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
});

//create table

const sql = `CREATE TABLE locations(
  ID INTEGER PRIMARY KEY,
  Name TEXT NOT NULL,
  Notes TEXT,
  LAT REAL NOT NULL,
  LNG REAL NOT NULL
)`;
db.run(sql);

// node .\table.js

//npm i sqlite3




