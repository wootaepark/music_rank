const express = require('express');
const path = require('path');

const router = express.Router();


router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/main',(req, res)=>{
    res.render('main');
});

router.get('/upload',(req,res)=>{
    res.render('upload',{title : '업로드하기'});
});

module.exports = router;

// '/' 페이지 라우터