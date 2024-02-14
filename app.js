const express= require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const indexRouter = require('./routes/index');
const mainRouter = require('./routes/main');

dotenv.config();
const app = express();


app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname,'public')));
app.use(morgan('dev'));



app.use('/',indexRouter);
app.use('/main',mainRouter);

app.use((req, res, next)=>{
    res.status(404).send('Page Not Found');
})



app.get((err,req,res,next)=>{
    console.error(err);
})

app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트에서 서버 대기 중');
});
































// 내가 구상하고 있는 어플리케이션 : 유튜브 (링크)혹은 자신이 mp3 파일을 올릴 수도 있다.

// 여러 사람들이 음악을 공유하고 별점 혹은 댓글을 달 수 있다.

// 좋아요 혹은 별점에 따른 순위를 볼 수 있도록 하는 것이 이 프로젝트의 목표