const db = require('../connectingDB');
const express = require('express');
const router = express.Router();

router.get('/ahadith/all/:lan', (req, res) => {
    let result = [];
    let lan = selectedLanguage(req.params.lan);
    if (lan.lan == 'Not supported')
        throw Error('Not Valid');

    let sql = `SELECT Book_ID,Chapter_ID,Hadith_ID,${lan.lan},${lan.sanad} FROM Ahadith`;

    db.all(sql, [], (err, rows) => {
        if (err) { throw err; }

        rows.forEach((row) => {
            // console.log(row);
            result.push(row);
        });
        res.send({ code: res.statusCode, status: res.statusMessage, AllChapters: result });
    });
})

router.get('/ahadith/:bookid/:chapterid/:lan', (req, res) => {

    let result = [];
    let lan = selectedLanguage(req.params.lan);
    if (lan == 'Not supported')
        return res.status(404);

    let sql = `SELECT Hadith_ID,${lan.lan},${lan.sanad} FROM Ahadith where Book_ID = ${req.params.bookid} and Chapter_ID = ${req.params.chapterid}`;

    db.all(sql, [], (err, rows) => {
        if (err) { throw err; }

        rows.forEach((row) => {
            result.push(row)
        });
        res.send({ code: res.statusCode, status: res.statusMessage, Chapter: result });
    });
})
router.get('/ahadithSearch/:key/:lan', (req, res) => {

    let result = [];
    let lan = selectedLanguage(req.params.lan);
    if (lan == 'Not supported')
        return res.status(404);

    let sql = `SELECT Book_ID,Chapter_ID,Hadith_ID,${lan.lan},${lan.sanad} FROM Ahadith WHERE ${lan.lan} LIKE '%${req.params.key}%'`;

    db.all(sql, [], (err, rows) => {
        if (err) { throw err; }

        rows.forEach((row) => {
            result.push(row)
        });
        res.send({ code: res.statusCode, status: res.statusMessage, Chapter: result });
    });
})


function selectedLanguage(parameter) {
    let lan, sanad;
    switch (parameter) {
        case 'en':
            lan = 'En_Text'
            sanad = 'En_Sanad'
            break;
        case 'ar-tashkeel':
            lan = 'Ar_Text';
            sanad = 'Ar_Sanad_1'
            break;
        case 'ar-noTashkeel':
            lan = 'Ar_Text_Without_Tashkeel';
            sanad = 'Ar_Sanad_Without_Tashkeel'
            break;
        default:
            lan = sanad = 'Not supported';
    }
    return { lan, sanad };
}


module.exports = router;