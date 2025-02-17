const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('survey_app.db');

db.serialize(() => {
    
    db.run(`CREATE TABLE IF NOT EXISTS adminok (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        felhasznalonev TEXT NOT NULL,
        jelszo TEXT UNIQUE NOT NULL,
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS kategoriak (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nev TEXT NOT NULL,
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS keszlet (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        termek_nev TEXT NOT NULL,
        mennyiseg INTEGER NOT NULL,
        ar decimal(10,2) NOT NULL,
        kategoria_id INTEGER DEFAULT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS rendelesek (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vevo_id INTEGER NOT NULL,
        rendeles_datum TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        allapot enum('Feldolgozás alatt','Kiszállítva','Teljesítve') NOT NULL DEFAULT 'Feldolgozás alatt'
        
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS rendeles_tetelek (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rendeles_id INTEGER NOT NULL,
        termek_id INTEGER NOT NULL,
        mennyiseg INTEGER NOT NULL,
        osszeg decimal(10,2) NOT NULL,
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS termekek (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nev VARCHAR NOT NULL,
        leiras TEXT NOT NULL,
        ar decimal(10,2) NOT NULL,
        kategoria_id INTEGER 
    )`);
});

module.exports = db;