const User = require('../models/user');

exports.renderMain = (req, res) =>{
    res.render('main');
}
exports.renderUpload = (req, res) =>{
    res.render('upload',{title : '업로드'});
}
exports.renderLogin = (req, res) =>{
    res.render('login',{title : '로그인', message : req.session.errorMessage});
}
exports.renderTitle = (req, res) =>{
    res.render('index');
}
exports.renderMyPage = (req, res) =>{
    res.render('myPage',{title : '마이페이지'});
    
}
exports.renderPost = async  (req, res, next) =>{

    try{
        const user = await User.findOne({where : {id : req.user.id}});
        if(req.user.id === parseInt(req.params.id,10)){
            res.locals.email = req.user.eamil;
            res.render('post');
        }
    }
    catch(error){
        console.error(error);
        next(error);

    }
    
    // 게시물 각각에 고유 아이디를 놓고
    // 리스트를 페이지별로 나누는 것을 /1 /2 식으로 해야할듯
    
    
}





// '/' 페이지 라우터