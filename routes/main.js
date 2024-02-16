const express = require('express');
const path = require('path');

const router = express.Router();


router.get('/', (req, res)=>{
    res.render('main');
});

module.exports = router;

// '/main' 라우터