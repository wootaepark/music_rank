const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () =>{
    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : false,
        
    },
    async (email, password, done)=>{
        try{
            const exUser = await User.findOne({where : {email}});
            if(exUser){
                const result = await bcrypt.compare(password, exUser.password);
                if(result){
                    done(null, exUser);
                }
                else{
                    done(null, false, {message : '비밀번호 불 일치'});
                }
            }
            else{
                done(null, flase, {message : '존재하지 않는 회원 입니다.'});
            }


        }
        catch(error){
            console.error(error);
            done(error);
        }
    }))
}