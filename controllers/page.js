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
    res.render('myPage');
}





// '/' 페이지 라우터