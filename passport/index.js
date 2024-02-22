const passport = require('passport');
const local = require('./localStrategy');
//const kakao = require('passport-kakao');
const User = require('../models/user');

module.exports = () =>{
    passport.serializeUser((user, done)=>{
        done(null, user.id); // session 에 저장할 정보 (user.id, 너무 많으면 오래 걸림)
    });
    passport.deserializeUser((id, done)=>{
        User.findOne({where : id})
        .then(user => done (null, user))
        .catch(err => done(err));
    });

    local();
}

