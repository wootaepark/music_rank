const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {getPost,createPost,patchPost, deletePost} = require('../controllers/post');
const {isLoggedIn} = require('../middlewares')
const Post = require('../models/post');
//const {isImageNull, isNotImageNull} = require('../middlewares/posts/image_patch');


const router = express.Router();


// 초기 업로드 폴더 생성
try{
    fs.readdirSync('uploads');
}
catch(error){
    console.error('폴더가 존재 x, 폴더를 만듭니다.');
    fs.mkdirSync('uploads');
}


// multer 를 이용한 이미지 업로드 시스템 구현
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'uploads/');
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname);

            const imgName = path.basename(file.originalname, ext) + Date.now() + ext;
            cb(null, imgName);
        },
    }),
    limits : {fileSize : 10*1024*1024}, // 이미지 크기 제한

});



// GET post/:id/img
router.get('/:id/img', isLoggedIn, getPost);

// POST post/upload
// Single Image
router.post('/upload',isLoggedIn,upload.single('img'),createPost);



// PATCH post/:id
// DELETE post/:id

router.route('/:id')
    .patch(isLoggedIn, upload.single('img'),patchPost)
    .delete(isLoggedIn, deletePost);


module.exports = router;