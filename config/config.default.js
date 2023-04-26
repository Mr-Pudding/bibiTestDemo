/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1660288998327_5216';

  // add your middleware config here
  config.middleware = ['globalThrow', 'userPower', 'getuser'];



  // 腾讯云vod
  config.tencentVod = {
    secret_id: "AKIDqVu2uVoqb5IExQcXBZfU2II0RbU6RUHo",
    secret_key: "HH1UgaDZeSyEDuKSKvEG2XkgLiodBSSA",
    vodSubAppId:1500014713
  }

  config.userPower = {
    match: [
      '/users/loginout',
      '/video',
      '/fava/video',
      "/comment",
      "/user",
      // "/video_read/:id",
      "/vod/sign"
    ]
  }

  // add your user config here
  config.security = {
    csrf: {
      enable: false,
    },
    // domainWhiteList: ["*"], // 白名单
  };

  config.multipart = {
    fileSize: '50mb',
    mode: 'stream',
    fileExtensions: ['.xls', '.txt', '.jpg', '.JPG', '.png', '.PNG', '.gif', '.GIF', '.jpeg', '.JPEG'], // 扩展几种上传的文件格式
  };

  config.cors = {
    origin: "*", // 跨任何域
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS", // 被允许的请求方式
  };


  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '123456',
    port: 3306,
    database: 'eggtext',
    // 中国时区
    timezone: '+08:00',
    define: {
      // 取消数据表名复数
      freezeTableName: true,
      // 自动写入时间戳 created_at updated_at
      timestamps: true,
      // 字段生成软删除时间戳 deleted_at
      // paranoid: true,
      createdAt: 'created_time',
      updatedAt: 'updated_time',
      // deletedAt: 'deleted_at',
      // 所有驼峰命名格式化
      underscored: true
    }
  };


  config.valparams = {
    locale: 'zh-cn',
    throwErro: true
  }

  config.crypto = {
    secret: 'qhdgw@45ncashdaksh2!#@3nxjdas*_672'
  }

  config.jwt = {
    secret: 'qhdgw@45ncashdaksh2!#@3nxjdas*_672'
  };

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '123456',
      db: 1,
    }
  }

  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
