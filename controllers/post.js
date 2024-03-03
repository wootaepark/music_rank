const Post = require('../models/post');
const {deleteImage} = require('../middlewares/posts/delete_image');

exports.afterUploadImg = (req,res,next) =>{
    console.log(req.file);
    res.json({url : `/img/${req.file.filename}`});
    
    
}
exports.getPost = async (req, res, next) =>{
    try{
        const post = Post.findOne({where : {id : req.params.id}});
        res.json({data : post});
    }
    catch(error){
        console.error(error);
    }
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
        
        return res.redirect('/mypage');

    }
    catch(error){
        console.error(error);
        return next(error);
    }



}

exports.patchPost = async (req, res, next) =>{
    const{img, title, content } = req.body; 
    
    try{
        const post = await Post.findOne({where : {id : req.params.id}});

        let oldImage = await post.img;
        oldImage = oldImage.substring(5);
        
          

        if(post && req.user.id === post.poster){
            if(req.file){
                deleteImage(__dirname,oldImage);
            }
            
            
            await Post.update({
                title,
                content,
                img : !req.file ? post.img :`/img/${req.file.filename}`,
            },{
                where : {
                    id : req.params.id,
                }
            })
            .then((result)=>{
                console.log(result);
            })
            .catch((error)=>{
                console.error(error);
            });
            
            res.json({ success: true, redirectUrl: '/mypage' });

        }
        else if(post && img === null){
            await Post.update({
                title,
                content,
                img :post.img,
            },{
                where : {
                    id : req.params.id,
                }
            })
            .then((result)=>{
                console.log(result);
            })
            .catch((error)=>{
                console.error(error);
            });
            
            res.json({ success: true, redirectUrl: '/mypage' });
        }
        else{
            return res.status(404).json({message : '해당하는 포스트가 없습니다.'});
        }
    }catch(error){
        console.error(error);
        return next(error);
    }
}



exports.deletePost = async (req, res, next)=>{
    try{
        const post = await Post.findOne({
            where : {id: req.params.id},
        });

        let oldImage = post.img;
        oldImage = oldImage.substring(5);

        if(post && req.user.id === post.poster){ // 해당 게시글을 게시한 사람과 현재 유저의 id 값이 같아야 삭제가 가능하도록
            await Post.destroy({
                where : {id : req.params.id}
            });
            deleteImage(__dirname,oldImage);    
           return res.status(200).json({message:'삭제 완료'});
        }
        else{
           return res.status(404).json({message : '해당 포스트가 존재 하지 않습니다.'});
        }


    }
    catch(error){
        console.error(error);
        next(error);
    }
}
