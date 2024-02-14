const express = require('express');
const path = require('path');

const router = express.Router();


router.get('/', (req, res)=>{
    res.render(path.join(__dirname,'..','views/index.html'));
});

module.exports = router;

// '/' 페이지 라우터