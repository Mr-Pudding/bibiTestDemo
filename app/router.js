'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/users/register', controller.users.register)
  router.post('/users/login', controller.users.login)
  router.post('/users/loginout', controller.users.loginOut)

  router.get('/sorticon', controller.sorticon.index)

  router.post('/video', controller.video.save)
  router.post('/video/update/:id', controller.video.update)
  router.post('/upload', controller.file.upload)
  router.get('/videolist/:page', controller.video.index)
  router.post("/video/destroy", controller.video.destroy)
  router.get('/category/:category_id/video/:page', controller.video.sortlist);

  router.post("/video/detail/save", controller.videoDetail.save)
  router.post("/video/detail/destroy", controller.videoDetail.destroy)
  router.post("/video/detail/update/:id", controller.videoDetail.update)
  //指定视频下的所有视频列表
  router.get('/video_detail/:video_id', controller.videoDetail.index);

  // 收藏/取消收藏视频
  router.post('/fava/video', controller.fava.video);
  //我的收藏列表
  router.get('/fava_list/:page', controller.fava.list);
  // 发表评论
  router.post('/comment', controller.comment.save);
  // 视频评论列表
  router.get('/video_comment/:id', controller.video.comment);
  // 关注
  router.post('/user/follow', controller.users.follow)
  // 取消关注
  router.post('/user/unfollow', controller.users.unfollow);
  // 我的关注列表
  router.get('/user/follows/:page', controller.users.follows);
  // 我的粉丝列表
router.get('/user/fens/:page', controller.users.fens);
// 统计相关数据
router.get('/user/statistics', controller.users.statistics);
// 查看视频详情
router.get('/video_read/:id', controller.video.read);
// 获取用户相关信息
router.get('/user/user_info', controller.users.user_info);
// vod签名
router.post('/vod/sign', controller.vod.sign);

  // 首页视频列表
  router.get('/index_data',controller.video.index_data);
  // router.post('/banner',controller.banner.save);
  router.get('/banner/list',controller.banner.list);
  //search页
  router.get('/video_search/:page',controller.video.search)

  router.get('/moive',controller.video.moive)

  router.get('/recommend',controller.video.recommend)
};
