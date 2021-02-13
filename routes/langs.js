const {LANGUAGES} = require('../db/languages');
const express = require('express');
const router = express.Router();

router.get('/language',(req,res)=>{
    res.send({languages:LANGUAGES.LANGUAGES});
})


module.exports = router;