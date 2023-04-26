module.exports = app => {
    const { STRING, INTEGER, DATE, ENUM, TEXT } = app.Sequelize;
  
    const Fava = app.model.define('fava', {
      id: {
        type: INTEGER(20),
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '用户id'
      },
      video_id: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '视频id'
      },
      created_time: DATE,
      updated_time: DATE
    });
  
    // 关联关系
    Fava.associate = function (models) {
      // 关联作者
      Fava.belongsTo(app.model.Users);
      // 关联视频
      Fava.belongsTo(app.model.Video);
    }
  
    return Fava;
  };