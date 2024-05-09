const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares');
const {join,login,logout} = require('../controllers/auth');

const router = express.Router();

// isNotLoggedIn 미들웨어를 이용하여 로그인 경로 구현

router.post('/join', isNotLoggedIn, join);
router.post('/login', isNotLoggedIn, login);
router.get('/logout', isLoggedIn, logout);




module.exports = router;