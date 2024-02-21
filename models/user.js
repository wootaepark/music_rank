const Sequelize = require('sequelize');


class User extends Sequelize.Model{
    static initiate(sequelize){
        User.init({
            nick : {
                type : Sequelize.STRING(20),
                allowNull : false,
                unique : true,

            },
            provider : {
                type : Sequelize.ENUM('local', 'kakao'),
                allowNull : false,
                defaultValue : 'local',
            },
            email:{
                type : Sequelize.STRING(50),
                allowNull : false,
                unique : false,

            },
            password:{
                type : Sequelize.STRING(100),
                allowNull : true,
               
            },
            snsId : {
                type : Sequelize.STRING(30),
                allowNull : true,
            }
        },
        {
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'User',
            tableName : 'users',
            paranoid : true,
            charset  : 'utf8',
            collate : 'utf8_general_ci',

            getterMethods : {
                isPasswordNull(){
                    return this.provider === 'local' ? false : true;
                }
            }

        })
    }

    static associate(db){
        
    }
};
module.exports = User;