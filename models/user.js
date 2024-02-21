const Sequelize = require('sequelize');


class User extends Sequelize.Model{
    static initiate(sequelize){
        User.init({
            nick : {

            },
            email:{

            },
            password:{

            }
        },
        {
            sequelize,

        })
    }

    static associate(db){
        
    }
};