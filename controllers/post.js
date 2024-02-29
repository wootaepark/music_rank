const Post = require('../models/post');

exports.afterUploadImg = (req,res,next) =>{
    console.log(req.file);
    res.json({url : `/img/${req.file.filename}`});
    
    
}


exports.createPost = async (req, res, next) =>{
    const{img, title, content } = req.body; // 이때 순서가 form 에 지정된 name 속성의 순서여야 한다.
    try{
        if(!title){
            return res.redirect('/upload?error=제목은 필수입니다.');
        }
        

        let postId;
        
        do{
            postId = String(Math.floor(100000 + Math.random() * 900000));
        } while (await Post.findOne({where : { postId }}));

        await Post.create({
            title,
            content,
            img : `/img/${req.file.filename}`,
            postId,
            poster : req.user.id,


        });
        
        return res.redirect('/');

    }
    catch(error){
        console.error(error);
        return next(error);
    }



}

exports.patchPost = async (req,res, next) =>{
    try{
        const post = await Post.findOne({where : {postId : req.parmas.id}});
        if(post){
            

        }
        else{
            res.status(404).json({message : '해당하는 포스트가 없습니다.'});
        }
    }catch(error){
        console.error(error);
        next(error);
    }
}

exports.deletePost = async (req, res, next)=>{
    try{
        const post = await Post.findOne({where : {postId : req.params.id}});
        if(post){
            await Post.destroy({
                where : {postId : req.params.id}
            });
        }
        else{
            res.status(404).json({message : '해당 포스트가 존재 하지 않습니다.'});
        }


    }
    catch(error){
        console.error(error);
        next(error);
    }
}
