const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const User = require('./user');
const Post = require('./post');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Post = Post;

User.initiate(sequelize);
Post.initiate(sequelize);

User.associate(db);
Post.associate(db);

module.exports = db;
