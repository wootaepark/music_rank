const express = require('express');
const path = require('path');

const router = express.Router();


router.get('/', (req, res)=>{
    res.render(path.join(__dirname,'..','views/main.html'));
});

module.exports = router;

// '/main' 라우터