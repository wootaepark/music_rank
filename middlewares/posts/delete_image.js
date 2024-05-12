const fs = require('fs');
const path = require('path');

// fs를 이용하여 image 삭제하는 미들웨어
// 알고리즘을 달리하는 경우도 있으니 책 확인해보기 !

exports.deleteImage = (filePath, fileName) =>{
    fs.readdir(path.join(filePath,'..','uploads'), (err, files)=>{
        if(err){
            console.error('Error reading folder',err);
            return;
        }
        console.log(files);
        
    

    files.forEach(file =>{
        if(file === fileName){
            const f_d = path.join(filePath,'../uploads', fileName); // f_d : file_directory, 이전 사진
            
            fs.unlink(f_d, err =>{

                if(err){
                    console.error('Error deleting file', f_d, err);
                }
                else{
                    console.log('File deleted :', f_d);
                }
            })

        }
    });
});

}

