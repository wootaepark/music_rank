const Sequelize = require('sequelize');

class Post extends Sequelize.Model{
    static initiate(sequelize){
        Post.init({
            title : {
                type : Sequelize.STRING(100),
                allowNull : false,
            }, // 게시물 제목

            content : {
                type : Sequelize.STRING(1000),
                allowNull : true,

            },// 게시물 내용
            img : {
                type : Sequelize.STRING(200),
                allowNull : false,
            },// 이미지 
            postId : {
                type : Sequelize.STRING(10),
                allowNull : false,
            }


            

        },
    {
        sequelize,
        timestamps : true,
        underscored : false,
        modelName : 'Post',
        tableName : 'posts',
        paranoid : true,
        charset : 'utf8mb4',
        collate : 'utf8mb4_general_ci',

    }
        )
    }



    
    static associate(db){
        db.Post.belongsTo(db.User,{foreignKey : 'poster', targetKey : 'id'});
    }
}
module.exports = Post;