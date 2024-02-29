const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');



exports.join = async (req, res, next) =>{
    const {nick, email, password, password_check} = req.body;
    try{
        const exUser = await User.findOne({where : {email}}); // 이메일 중복 체크
        const nxUser = await User.findOne({where : {nick}}); // 닉네임 중복 체크

        if(!nick){
            return res.redirect('/login?error=닉네임은 필수 입니다.');
        }
        if(!email){
            return res.redirect('/login?error=이메일은 필수 입니다.');
        }
        if(!password){
            return res.redirect('/login?error=비밀번호를 입력하세요');
        }

        if(exUser){
            return res.redirect('/login?error=이메일이 존재합니다.');
        }
        if(nxUser){
            return res.redirect('/login?error=닉네임이 존재합니다.');
        }
        if(password !== password_check){
            return res.redirect('/login?error=비밀번호를 확인해주세요.');
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