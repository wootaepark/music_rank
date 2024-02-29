const fs = require('fs');
const path = require('path');


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

