const express = require('express');
const mysql = require('mysql');
let id = 203;
// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sporto_db'
});

// Connect to my database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("database connected");
});
const app = express();

//DELETE COUNTRY
app.get('/delete/:table/:attribute/:id', (req, res) => {
    let sql = 'DELETE FROM ' + req.params.table + ' WHERE ' + req.params.attribute + ' = ' + req.params.id;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
//DISPLAY RANGE REQUESTS
app.get('/getrange/:table/:attribute/:from/:to', (req, res) => {
    let sql = 'SELECT * FROM ' + req.params.table + ' WHERE ' + req.params.attribute + ' BETWEEN ' + req.params.from + ' AND ' + req.params.to;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
//SELECT ALL REQUESTS
app.get('/get/:table', (req, res) => {
    let sql = 'SELECT * FROM ' + req.params.table;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
//INSTERT DATA
app.get('/insertcity/:name/:pop/:capital/:area/:fk_id', (req, res) => {
    let post = {
        Pavadinimas: req.params.name,
        Gyventojuskaicius: req.params.pop,
        Sostine: req.params.capital,
        Plotas: req.params.area,
        id_Miestas: id++,
        fk_Salisid_Salis: req.params.fk_id
    }
    let sql = 'INSERT INTO miestas SET ?';
    let query = db.query(sql, post, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
})
app.get('/insertcountry/:name/:pop/:union/:continent/:governement', (req, res) => {
    let post = {
        Pavadinimas: req.params.name,
        Gyventojuskaicius: req.params.pop,
        Sajunga: req.params.union,
        Zemynas: req.params.continent,
        Valdymoforma: req.params.governement,
        id_Salis: id++,
    }
    let sql = 'INSERT INTO salis SET ?';
    let query = db.query(sql, post, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
})
/*

UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;

*/
app.get('/updatecountry/:value/:id', (req, res) => {
    let sql = 'UPDATE salis SET Gyventojuskaicius = '+ req.params.value + ' WHERE id_Salis = ' + req.params.id;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
app.get('/updatecity/:value1/:value2/:id', (req, res) => {
    let sql = 'UPDATE miestas SET Pavadinimas = ' + req.params.value1 + ', Gyventojuskaicius = '+ req.params.value2 + ' WHERE id_Miestas = ' + req.params.id;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
app.get('/updatefederation/:value/:id', (req, res) => {
    let sql = 'UPDATE federacija SET Pavadinimas = ' + req.params.value + ' WHERE id_Federacija = ' + req.params.id;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
app.get('/updateleague/:value/:id', (req, res) => {
    let sql = 'UPDATE lyga SET Bustine = ' + req.params.value + ' WHERE id_Lyga = ' + req.params.id;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
app.get('/updatesport/:value/:id', (req, res) => {
    let sql = 'UPDATE sportas SET Olimpiadinissportas = ' + req.params.value + ' WHERE id_Sportas = ' + req.params.id;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
app.get('/updatecenter/:value1/value2/:id', (req, res) => {
    let sql = 'UPDATE sportocentras SET Pavadinimas = ' + req.params.value1 + ', Talpa = ' + req.params.value2 +' WHERE id_Sportocentras = ' + req.params.id;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
app.get('/updateplayer/:value1/value2/:id', (req, res) => {
    let sql = 'UPDATE zaidejas SET Ugis = ' + req.params.value1 + ', Svoris = ' + req.params.value2 + ' WHERE id_Zaidejas = ' + req.params.id;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
app.get('/updatetournament/:value/:id', (req, res) => {
    let sql = 'UPDATE turnyrai SET Laikotarpis = ' + req.params.value + ' WHERE id_Turnyrai = ' + req.params.id;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
app.get('/updateteam/:value/:id', (req, res) => {
    let sql = 'UPDATE komanda SET Nariuskaicius = ' + req.params.value + ' WHERE id_Komanda = ' + req.params.id;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
app.get('/updatemedia/:value/:id', (req, res) => {
    let sql = 'UPDATE ziniasklaida SET Reitingas = '+ req.params.value + ' WHERE id_Ziniasklaida = ' + req.params.id;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
app.listen('4000', () => {
    console.log(id);
});

 