const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


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



router.post('/img', upload.single('img'),(req,res,next)=>{
    try{
        res.redirect('/main');
    }
    catch(error){
        console.error(error);
        next(error);
    }
    
    
});



module.exports = router;