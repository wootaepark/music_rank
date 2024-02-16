const express = require('express');
const path = require('path');

const router = express.Router();


router.get('/', (req, res)=>{
    res.render('index');
});

module.exports = router;

// '/' 페이지 라우터