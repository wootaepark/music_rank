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
        return res.send(decodeURIComponent(message));
    }
}

// 로그인이 되어 있는지 확인하는 미들웨어, req.isAuthenticated()가 정의 되어 있으면 로그인 된 상태