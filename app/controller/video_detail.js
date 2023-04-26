'use strict';


const Controller = require('egg').Controller;

let rules = {
    title: {
        type: 'string',
        required: true,
        desc: '视频标题'
    },
    url: {
        type: 'string',
        required: true,
        desc: '视频地址'
    },
    video_id: {
        type: 'int',
        required: true,
        desc: '所属视频ID'
    },
    desc: {
        type: 'string',
        required: true,
        desc: '描述'
    },
}

class Video_detailController extends Controller {
    async save() {
        let userinfo = this.ctx.userInfo

        this.ctx.validate(rules)

        let { title, url, video_id, desc } = this.ctx.request.body

        let video = await this.ctx.model.Video.findOne({
            where: {
                id: video_id,
                user_id: userinfo.id
            }
        })

        if (!video) {
            this.ctx.throw(201, "所属作品不存在")
        } else {
            let result = await this.ctx.model.VideoDetail.create({
                title,
                url,
                video_id,
                desc
            })
            this.ctx.apiSuccess(result)
        }

    }

    async update() {
        let { ctx, app } = this;
        let userinfo = ctx.userInfo;

        ctx.validate({
            id: {
                type: "int",
                required: true,
                desc: "视频ID"
            },
            ...rules
        });

        let {
            title,
            url,
            video_id,
            desc,
        } = ctx.request.body;

        let id = ctx.params.id

        // 所属作品是否存在
        let video = await app.model.Video.findOne({
            where: {
                id: video_id,
                user_id: userinfo.id
            }
        });
        if (!video) {
            ctx.throw(404, '所属作品不存在');
        }

        let vd = await app.model.VideoDetail.findOne({
            where: {
                id,
                video_id//所属视频ID
            }
        });

        if (!vd) {
            ctx.throw(404, '当前记录不存在');
        }

        let res = await vd.update({
            title,
            url,
            video_id,
            desc,
        });

        ctx.apiSuccess(res);
    }


    // 删除
    async destroy() {
        let { ctx, app } = this;
        let userinfo = ctx.userInfo;

        ctx.validate({
            id: {
                type: "int",
                required: true,
                desc: "视频ID"
            }
        });

        let { id } = ctx.request.body;

        let video = await app.model.VideoDetail.findOne({
            where: {
                id,
            },
            include: [{
                model: app.model.Video,
                where: {
                    user_id: userinfo.id
                }
            }]
        });

        if (!video) {
            return ctx.throw(404, '该记录不存在');
        }

        await video.destroy();

        ctx.apiSuccess('ok');

    }

    //指定视频下的所有视频列表
    async index() {
        let { ctx, app } = this;
        ctx.validate({
            video_id: {
                type: "int",
                required: true,
                desc: "视频ID"
            }
        });
        let { video_id } = ctx.params;
        let rows = await app.model.VideoDetail.findAll({
            where: {
                video_id
            }
        });
        ctx.apiSuccess(rows);
    }

}

module.exports = Video_detailController;
