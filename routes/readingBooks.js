const db = require('../connectingDB');
const { selectedLanguage } = require('../db/languages')
const express = require('express');
const router = express.Router();


router.get('/books/:lan', (req, res) => {
    let result = [];
    let lan = selectedLanguage(req.params.lan);
    let sql = `SELECT Book_ID,${lan} FROM Books`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows.length == 0)
            return res.status(404);
        rows.forEach((row) => {
            // console.log(row);
            result.push({ Book_ID: row['Book_ID'], Book_Name: row[lan] });
        });
        res.send({ code: res.statusCode, status: res.statusMessage, Books: result });
    });
})

module.exports = router;

// router.get('/book/search/:lan/:name', (req, res) => {
    //     let lan = selectedLanguage(req.params.lan);
    //     let sql = `SELECT ${lan} FROM Books WHERE ${lan} REGEXP ?`;

    //     db.each(sql, [`${req.params.name}`], (err, row) => {
    //         if (err) {
    //             console.log(err.message);
    //         } else
    //             console.log(row);
    //         res.send(row[lan])
    //     });
    // })

// // close the database connection
// db.close((err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Close the database connection.');
// });