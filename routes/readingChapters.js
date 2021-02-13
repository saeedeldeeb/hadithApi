const db = require('../connectingDB');
const { selectedLanguage } = require('../db/languages')
const express = require('express');
const router = express.Router();

router.get('/chapter/all/:lan', (req, res) => {
    let result = [];
    let lan = selectedLanguage(req.params.lan);
    if (lan == 'Not supported')
        return res.status(404);

    let sql = `SELECT Book_ID,Chapter_ID,Chapter_Intro,${lan} FROM Chapters`;

    db.all(sql, [], (err, rows) => {
        if (err) { throw err; }

        rows.forEach((row) => {
            // console.log(row);
            result.push({
                Book_ID: row['Book_ID'],
                Chapter_ID: row['Chapter_ID'],
                Chapter_Name: row[lan],
                Chapter_Intro: row['Chapter_Intro']
            });
        });
        res.send({ code: res.statusCode, status: res.statusMessage, AllChapters: result });
    });
})
router.get('/chapter/:bookid/:lan', (req, res) => {

    let result = [];
    let lan = selectedLanguage(req.params.lan);
    if (lan == 'Not supported')
        return res.status(404);
        
    let sql = `SELECT Chapter_ID,${lan} FROM Chapters where Book_ID = ${req.params.bookid}`;

    db.all(sql, [], (err, rows) => {
        if (err) { throw err; }

        rows.forEach((row) => {
            // console.log(row);
            result.push({ Chapter_ID: row['Chapter_ID'], Chapter_Name: row[lan] });
        });
        res.send({ code: res.statusCode, status: res.statusMessage, Chapter: result });
    });
})
router.get('/chapter/intro/:bookid/:chapterid', (req, res) => {
    let result = [];
    let sql = `SELECT Chapter_Intro FROM Chapters where Book_ID = ${req.params.bookid} and Chapter_ID = ${req.params.chapterid}`;

    db.all(sql, [], (err, rows) => {
        if (err) { throw err; }

        rows.forEach((row) => {
            // console.log(row);
            result.push({ Chapter_Intro: row['Chapter_Intro'] });
        });
        res.send({ code: res.statusCode, status: res.statusMessage, Chapter_Intro: result });
    });
})
module.exports = router;
