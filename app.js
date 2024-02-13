const express= require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');


dotenv.config();
const app = express();


app.set('port', process.env.PORT | 3000);
app.use(express.static(path.join(__dirname,'public')));

app.use(morgan('dev'));


app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views/index.html'));
});


app.get('/main',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views/main.html'));
    next();
}, (req,res,next)=>{
    const musicPath = path.join(__dirname, 'music/sample.mp3');
   // res.sendFile(musicPath);
});

// 내가 구상하고 있는 어플리케이션 : 유튜브 (링크)혹은 자신이 mp3 파일을 올릴 수도 있다.

// 여러 사람들이 음악을 공유하고 별점 혹은 댓글을 달 수 있다.

// 좋아요 혹은 별점에 따른 순위를 볼 수 있도록 하는 것이 이 프로젝트의 목표

app.get((err,req,res,next)=>{
    console.error(err);
})

app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트에서 서버 대기 중');
});