const express = require('express');
const cors = require('cors');
const db = require('./data');
const { userValidation, companyValidation } = require('./validation');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//Adminok tábla
app.post('/api/admins', (req, res) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { felhasznalonev, jelszo } = req.body;
    db.run('INSERT INTO adminok (felhasznalonev, jelszo) VALUES (?, ?, ?)',
        [felhasznalonev, jelszo],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, felhasznalonev, jelszo });
        });
});

app.get('/api/admins', (req, res) => {
    db.all('SELECT * FROM adminok', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.put('/api/admins/:id', (req, res) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { felhasznalonev, jelszo } = req.body;
    db.run(
        'UPDATE adminok SET felhasznalonev = ?, jelszo = ? WHERE id = ?',
        [name, email, password, req.params.id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: "A felhasználó nem található." });
            res.json({ id: req.params.id, felhasznalonev, jelszo });
        }
    );
});

app.delete('/api/admins/:id', (req, res) => {
    db.run('DELETE FROM adminok WHERE id = ?', req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "A felhasználó nem található" });
        res.json({ message: "A felhasználó törölve lett" });
    });
});

//Kategoriák tábla
app.post('/api/category', (req, res) => {
    const { error } = companyValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { nev } = req.body;
    
    db.run(`INSERT INTO kategoriak (nev) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nev],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, ...req.body });
        });
});

app.get('/api/category', (req, res) => {
    db.all('SELECT * FROM companies', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.put('/api/category/:id', (req, res) => {
    const { error } = companyValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { nev } = req.body;
    
    db.run(
        `UPDATE kategoriak SET nev = ?`,
        [nev, req.params.id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: "A cég nem található" });
            res.json({ id: req.params.id, ...req.body });
        }
    );
});


app.delete('/api/category/:id', (req, res) => {
    db.run('DELETE FROM kategoriak WHERE id = ?', req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "A cég nem található" });
        res.json({ message: "A cég törölve lett" });
    });
});


//Készlet tábla
app.post('/api/keszlet', (req, res) => {
    const { termek_nev, mennyiseg, ar, kategoria_id	} = req.body;
    
    db.run(`INSERT INTO keszlet (termek_nev, mennyiseg, ar) 
            VALUES (?, ?, ?, ?, ?, ?)`,
        [termek_nev, mennyiseg, ar],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, ...req.body });
        });
});

app.get('/api/keszlet', (req, res) => {
    db.all('SELECT * FROM keszlet', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.put('/api/keszlet/:id', (req, res) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { termek_nev, mennyiseg, ar } = req.body;
    db.run(
        'UPDATE keszlet SET termek_nev = ?, mennyiseg = ?, ar = ?',
        [termek_nev, mennyiseg, ar, req.params.id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: "A felhasználó nem található." });
            res.json({ id: req.params.id, termek_nev, mennyiseg, ar });
        }
    );
});

app.delete('/api/keszlet/:id', (req, res) => {
    db.run('DELETE FROM keszlet WHERE id = ?', req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "A felhasználó nem található" });
        res.json({ message: "A felhasználó törölve lett" });
    });
});


//Rendelések tábla
app.post('/api/rendelesek', (req, res) => {
    const { rendeles_datum, allapot	} = req.body;
    
    db.run(`INSERT INTO rendelesek (rendeles_datum, allapot) 
            VALUES (?, ?, ?, ?, ?, ?)`,
        [rendeles_datum, allapot],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, ...req.body });
        });
});

app.get('/api/rendelesek', (req, res) => {
    db.all('SELECT * FROM rendelesek', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.put('/api/rendelesek/:id', (req, res) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { rendeles_datum, allapot } = req.body;
    db.run(
        'UPDATE rendelesek SET rendeles_datum = ?, allapot = ?',
        [rendeles_datum, allapot, req.params.id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: "A felhasználó nem található." });
            res.json({ id: req.params.id, rendeles_datum, allapot });
        }
    );
});

app.delete('/api/rendelesek/:id', (req, res) => {
    db.run('DELETE FROM rendelesek WHERE id = ?', req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "A felhasználó nem található" });
        res.json({ message: "A felhasználó törölve lett" });
    });
});

//rendeles_tetelek tábla
app.post('/api/rendeles_tetelek', (req, res) => {
    const { mennyiseg, osszeg	} = req.body;
    
    db.run(`INSERT INTO rendeles_tetelek (mennyiseg, osszeg) 
            VALUES (?, ?, ?, ?, ?, ?)`,
        [mennyiseg, osszeg],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, ...req.body });
        });
});

app.get('/api/rendeles_tetelek', (req, res) => {
    db.all('SELECT * FROM rendeles_tetelek', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.put('/api/rendeles_tetelek/:id', (req, res) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { rendeles_datum, allapot } = req.body;
    db.run(
        'UPDATE rendeles_tetelek SET mennyiseg = ?, osszeg = ?',
        [mennyiseg, osszeg, req.params.id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: "A felhasználó nem található." });
            res.json({ id: req.params.id, mennyiseg, osszeg });
        }
    );
});

app.delete('/api/rendeles_tetelek/:id', (req, res) => {
    db.run('DELETE FROM rendeles_tetelek WHERE id = ?', req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "A felhasználó nem található" });
        res.json({ message: "A felhasználó törölve lett" });
    });
});


//Termékek tábla
app.post('/api/termekek', (req, res) => {
    const { mennyiseg, osszeg	} = req.body;
    
    db.run(`INSERT INTO termekek (nev, leiras, ar) 
            VALUES (?, ?, ?, ?, ?, ?)`,
        [nev, leiras, ar],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, ...req.body });
        });
});

app.get('/api/termekek', (req, res) => {
    db.all('SELECT * FROM termekek', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.put('/api/termekek/:id', (req, res) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { nev, leiras, ar } = req.body;
    db.run(
        'UPDATE termekek SET nev = ?, leiras = ?, ar = ?',
        [nev, leiras, ar, req.params.id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: "A felhasználó nem található." });
            res.json({ id: req.params.id, nev, leiras, ar });
        }
    );
});

app.delete('/api/termekek/:id', (req, res) => {
    db.run('DELETE FROM termekek WHERE id = ?', req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "A felhasználó nem található" });
        res.json({ message: "A felhasználó törölve lett" });
    });
});

//Vevő tábla
app.post('/api/vevo', (req, res) => {
    const { mennyiseg, osszeg	} = req.body;
    
    db.run(`INSERT INTO vevo (felhasznalonev, email, jelszo, regisztracio_datuma) 
            VALUES (?, ?, ?, ?, ?, ?)`,
        [felhasznalonev, email, jelszo, regisztracio_datuma],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, ...req.body });
        });
});

app.get('/api/vevo', (req, res) => {
    db.all('SELECT * FROM vevo', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.put('/api/vevo/:id', (req, res) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { felhasznalonev, email, jelszo, regisztracio_datuma } = req.body;
    db.run(
        'UPDATE vevo SET felhasznalonev = ?, email = ?, jelszo = ?, regisztracio_datuma = ?',
        [felhasznalonev, email, jelszo, regisztracio_datuma, req.params.id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: "A felhasználó nem található." });
            res.json({ id: req.params.id, felhasznalonev, email, jelszo, regisztracio_datuma });
        }
    );
});

app.delete('/api/vevo/:id', (req, res) => {
    db.run('DELETE FROM vevo WHERE id = ?', req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "A felhasználó nem található" });
        res.json({ message: "A felhasználó törölve lett" });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});