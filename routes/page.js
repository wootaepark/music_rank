const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares');
const {renderTitle, renderMain, renderUpload, renderLogin} = require('../controllers/page');

const router = express.Router();

router.use((req, res, next)=>{
    res.locals.user = req.user;
    next();
});

router.get('/',renderTitle);
router.get('/main',renderMain);
router.get('/upload',isLoggedIn,renderUpload);
router.get('/login',isNotLoggedIn,renderLogin);

module.exports = router;


