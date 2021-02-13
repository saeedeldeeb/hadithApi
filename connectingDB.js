const sqlite3 =  require('sqlite3').verbose();
const fs = require('fs');
const dbFile = './db/book.sqlite';
const dbExists = fs.existsSync(dbFile);

if (!dbExists) {
    console.log('Error finding database file');
}

const db = new sqlite3.Database(dbFile,sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the ahadith database.');
});

module.exports = db;