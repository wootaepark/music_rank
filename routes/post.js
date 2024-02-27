const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {createPost} = require('../controllers/post');
const {isLoggedIn} = require('../middlewares')

const router = express.Router();

try{
    fs.readdirSync('uploads');
}
catch(error){
    console.error('폴더가 존재 x, 폴더를 만듭니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'uploads/');
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits : {fileSize : 5*1024*1024}
});



// post/upload
router.post('/upload',isLoggedIn,upload.single('img'),createPost);



module.exports = router;