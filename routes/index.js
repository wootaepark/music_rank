const express = require('express');
const path = require('path');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares');

const router = express.Router();


router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/main',(req, res)=>{
    res.render('main');
});

router.get('/upload',isLoggedIn,(req,res)=>{
    res.render('upload',{title : '업로드'});
});
router.get('/login',isNotLoggedIn,(req, res)=>{
    res.render('login',{title : '로그인'});
})



module.exports = router;

// '/' 페이지 라우터