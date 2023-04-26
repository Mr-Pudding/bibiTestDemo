'use strict';

const Controller = require('egg').Controller;

class FavaController extends Controller {
   // 收藏/取消收藏视频
   async video() {
    const { ctx, app } = this;
    let userinfo = ctx.userInfo;

    ctx.validate({
        video_id: {
            type: "int",
            required: true,
            desc: "视频ID"
        },
    });

    let {
        video_id,
    } = ctx.request.body;

    let fava = await app.model.Fava.findOne({
        where: {
            video_id,
            user_id: userinfo.id
        }
    });

    if (fava) {
        fava.destroy()
        return ctx.apiSuccess({
            status: false,
            msg: "取消收藏成功"
        });
    }

    let video = await app.model.Video.findOne({
        where: {
            id: video_id
        }
    });

    if (!video) {
        return ctx.apiFail('视频不存在');
    }

    await app.model.Fava.create({
        video_id,
        user_id: userinfo.id
    });

    ctx.apiSuccess({
        status: true,
        msg: "收藏成功"
    });
}

 // 我的收藏列表
 async list() {
    const { ctx, app } = this;
    let userinfo = ctx.userInfo;

    ctx.validate({
        page: {
            required: true,
            desc: "页码",
            type: "int"
        },
        user_id: {
            required: true,
            desc: "用户id",
            type: "int"
        }
    });

    let user_id = ctx.query.user_id;
     
    console.log(user_id)
    let page = ctx.params.page ? parseInt(ctx.params.page) : 1
    let limit = ctx.query.limit ? parseInt(ctx.query.limit) : 10
    let offset = (page - 1) * limit

    let rows=await ctx.model.Fava.findAndCountAll({
        where:{
            user_id
        },
        limit,
        offset,
        include: [{
            model: app.model.Video,
        }]
    })

    // rows = rows.map(item => {
    //     return {
    //         created_time: item.video.created_time,
    //         id: item.video.id,
    //         title: item.video.title,
    //         cover: item.video.cover,
    //         category_id: item.video.category_id,
    //         user_id: item.video.user_id,
    //         duration: item.video.duration,
    //         desc: item.video.desc,
    //         play_count: item.video.play_count,
    //         danmu_count: item.video.danmu_count,
    //         updated_time: item.video.updated_time,
    //     }
    // });

    ctx.apiSuccess(rows);
}
}

module.exports = FavaController;
