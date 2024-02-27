const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');



exports.join = async (req, res, next) =>{
    const {nick, email, password, password_check} = req.body;
    try{
        const exUser = await User.findOne({where : {email}}); // 이메일 중복 체크
        const nxUser = await User.findOne({where : {nick}}); // 닉네임 중복 체크

        if(exUser || nxUser){
            return res.redirect('/login?error=exist');
        }
        if(password !== password_check){
            return res.redirect('/login');
        }
        const hash = await bcrypt.hash(password,12);
        await User.create({
            nick,
            email,
            password : hash,
        });
        return res.redirect('/main');

    }
    catch(error){
        console.error(error);
        return next(error);
    }
}

exports.login = (req, res, next)=>{
    passport.authenticate('local', (authError, user, info) =>{
       
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            
            req.session.errorMessage='로그인 오류';
            console.log(req.session.errorMessage);
            return res.redirect(`/login?error=${req.session.errorMessage}`);

        }
        return req.login(user, (loginError) =>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            
            return res.redirect('/main');
        });
    })(req, res, next);
}

exports.logout = (req, res, next) =>{
    req.logout(()=>{
         res.redirect('/main');
    });
};