const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports= class Comment extends Model {
  static init(sequelize){
    return super.init({
      //id가 기본적으로 들어있다.
      content:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      //User_id: 1
      //Post_id: 3
    },{
      modelName: 'Comment',
      tableName: 'comments',
      charset:'utf8',
      collate: 'utf8_general_ci', //한글 저장
      sequelize,
    });
  }

  static associate(db){
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  }
};



