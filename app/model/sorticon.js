module.exports = app => {
    const { STRING, INTEGER, DATE, ENUM, TEXT } = app.Sequelize;
  
    const sorticon = app.model.define('sorticon', {
      id: {
        type: INTEGER(20),
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: STRING(100),
        allowNull: false,
        defaultValue: '',
        comment: '分类名称'
      },
      cover: {
        type: STRING,
        allowNull: true,
        defaultValue: '',
        comment: '分类图标'
      },
      desc: {
        type: TEXT,
        allowNull: false,
        defaultValue: '',
        comment: '分类描述',
      },
      created_time: DATE,
      updated_time: DATE,
    });
  
    return sorticon;
  };