const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares');
const {renderTitle, renderMain, renderUpload, renderLogin,renderMyPage} = require('../controllers/page');

const router = express.Router();

router.use((req, res, next)=>{
    res.locals.user = req.user;
    next();
});

router.get('/',renderTitle);
router.get('/main',renderMain);
router.get('/upload',isLoggedIn,renderUpload);
router.get('/login',isNotLoggedIn,renderLogin);
router.get('/mypage',isLoggedIn ,renderMyPage);

module.exports = router;


