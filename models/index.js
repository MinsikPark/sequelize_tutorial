const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

const db = {}

//DB연동
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// model 매핑
db.User = require('./user')(sequelize, Sequelize); 
db.comment = require('./comment')(sequelize, Sequelize); 

// 종속관계 설정
db.User.hasMany(db.comment, {foreignKey : 'commenter', sourceKey : 'id'});
db.comment.belongsTo(db.User, {foreignKey : 'commenter', targetKey :'id'});
module.exports = db;