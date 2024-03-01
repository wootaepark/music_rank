const User = require('../models/user');
const Post = require('../models/post');

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
exports.renderMyPage = async (req, res, next) =>{

    try{
        
        const posts = await Post.findAll({
            where : {poster : req.user.id},
        include : {
            model : User,
            attributes : ['id','nick'],
        },
        order : [['createdAt', 'DESC']],
    
    });
    
        return res.render('myPage',{
            title : '마이페이지',
            user : req.user,
            twits : posts,
        })
    }
    catch(error){
        console.error(error);
        next(error);
    }
    
}

exports.renderPost = async  (req, res, next) =>{

    try{
        const post = await Post.findOne({where : {id : req.params.id}});
        if(post && req.user.id === post.poster){

            
            res.render('modify-post');

        }
        else{
            res.status(400).json({error : '권한이 없습니다.'});
        }
    }
    catch(error){
        console.error(error);
        next(error);

    }
    
  
    
    
}





// '/' 페이지 라우터