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
exports.renderPost = async (req, res, next) =>{
    try{
        const post = await Post.findOne({
            where : {id : req.params.id},
            include : {
                model : User,
                attributes : ['id','nick'],
            }
        });
        if(post){
            
            res.render('post',{
                title : post.title,
                twit : post,
            });
        }
        else{
            res.status(404).json({error : '해당 포스트는 없습니다.'});
        }
    }
    catch(err){
        console.error(err);
        next(err);
    }
    
}
exports.renderPostAll = async (req, res, next) =>{

    try{
        const post = await Post.findAll({
            include : {
                model : User,
                attributes : ['id','nick'], 
            }
            
        });
        res.locals.posts = post;
    
       
    
        
        res.render('postAll',{user : req.user});
    }
    catch(err){
        console.error(err);
        next(err);
    }
   
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
            //user : req.user, // req.user 는 시퀄라이즈 생성시 로그인시 생성되는 파라미터
            twits : posts,
        })
    }
    catch(error){
        console.error(error);
        next(error);
    }
    
}

exports.renderModify = async  (req, res, next) =>{

    try{
        const post = await Post.findOne({where : {id : req.params.id}
            
        
        });
        if(post && req.user.id === post.poster){


            res.locals.post = post;
            res.render('modify-post');

        }
        else{
            res.status(404).json({error : '권한이 없습니다.'});
        }
    }
    catch(error){
        console.error(error);
        next(error);

    }
    
  
    
    
}
exports.renderViewPage = async(req, res, next) =>{
    try{
        const user = await User.findOne({where : {nick : req.params.id}});
        const posts = await Post.findAll({where : {poster : user.id}});

        if(!user){
            res.status(404).json({error : '해당 유저가 존재하지 않습니다.'});
        }
       

        console.log('타입 ',typeof(user.nick),'파라미터' , req.params.id);
        res.render('viewPage',{
            
            title : user.nick,
            posts : posts,


        });
    }
    catch(error){
        console.error(error);
        next(error);
    }
}





// '/' 페이지 라우터