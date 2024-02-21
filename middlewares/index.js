exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/login');
    }
};

exports.isNotLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        next();
    }else{
        const message = encodeURIComponent('로그인 한 상태입니다.');
        res.direct(`/error=${message}`);
    }
}