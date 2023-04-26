'use strict';

const await = require('await-stream-ready/lib/await');

const rules = {
    title: {
        type: 'string',
        required: true,
        desc: '视频标题'
    },
    cover: {
        type: 'string',
        required: true,
        desc: '封面'
    },
    category_id: {
        type: 'int',
        required: true,
        desc: '分类ID'
    },
    desc: {
        type: 'string',
        required: true,
        desc: '描述'
    },
};

const Controller = require('egg').Controller;

class VideoController extends Controller {

    async save() {
        let userInfo = this.ctx.userInfo
        this.ctx.validate(rules)

        let { title, cover, category_id, desc } = this.ctx.request.body

        let result = await this.ctx.model.Video.create({
            title,
            cover,
            category_id,
            desc,
            user_id: userInfo.id
        })

        this.ctx.apiSuccess(result)
    }


    async index() {
        let userinfo = this.ctx.userInfo
        this.ctx.validate({
            page: {
                required: true,
                desc: '页码',
                type: 'int'
            },
            user_id: {
                required: true,
                desc: '用户id',
                type: 'int'
            },
            limit: {
                required: false,
                desc: '页中数据',
                type: 'int'
            }
        })
        let page = this.ctx.params.page ? parseInt(this.ctx.params.page) : 1
        let limit = this.ctx.query.limit ? parseInt(this.ctx.query.limit) : 10
        let user_id = this.ctx.query.user_id
        let offset = (page - 1) * limit

        let result = await this.ctx.model.Video.findAndCountAll({
            where: {
                user_id,

            },
            offset: offset,
            limit: limit
        })

        this.ctx.apiSuccess(result)
    }

    async update() {
        let userinfo = this.ctx.userInfo

        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '视频ID'
            },
            ...rules
        })

        let {
            //分类id:catregory_id
            title, cover, desc, category_id
        } = this.ctx.request.body

        let result = await this.ctx.model.Video.findOne({
            where: {
                id: this.ctx.params.id,
                user_id: userinfo.id
            }
        })

        if (!result) {
            this.ctx.throw(201, '该记录不存在')
        } else {
            let res = await result.update({
                title,
                cover,
                category_id,
                desc
            })
            this.ctx.apiSuccess(res)
        }

    }

    async destroy() {
        let { ctx, app } = this;
        let userinfo = ctx.userInfo;

        ctx.validate({
            id: {
                type: "int",
                required: true,
                desc: "作品ID"
            }
        });

        let { id } = ctx.request.body;

        let video = await app.model.Video.findOne({
            where: {
                id,
                user_id: userinfo.id
            }
        });

        if (!video) {
            return ctx.throw(404, '该记录不存在');
        }

        await video.destroy();

        ctx.apiSuccess('ok');
    }

    async sortlist() {
        let { ctx, app } = this;
        ctx.validate({
            category_id: {
                type: "int",
                required: true,
                desc: "分类ID"
            },
            page: {
                type: "int",
                required: true,
                desc: "分页"
            }
        });

        let { category_id } = ctx.params;
        let page = this.ctx.params.page ? parseInt(this.ctx.params.page) : 1
        let limit = this.ctx.query.limit ? parseInt(this.ctx.query.limit) : 10
        let offset = (page - 1) * limit


        let rows = await ctx.model.Video.findAndCountAll({
            where: {
                category_id
            },
            limit,
            offset
        })
        ctx.apiSuccess(rows);
    }
    // 评论列表
    async comment() {
        const { app, ctx } = this;

        ctx.validate({
            id: {
                type: "int",
                required: true,
                desc: "视频ID"
            },
        });

        let { id } = ctx.params;

        let rows = await app.model.Comment.findAll({
            where: {
                video_id: id,
                reply_id: 0
            },
            include: [{
                model: app.model.Users,
                as: "reply_user",
                //avatar:头像
                attributes: ['id', 'username', 'nickname', 'avatar'],
            }, {
                model: app.model.Users,
                as: "send_user",
                attributes: ['id', 'username', 'nickname', 'avatar']
            }, {
                model: app.model.Comment,
                include: [{
                    model: app.model.Users,
                    as: "reply_user",
                    attributes: ['id', 'username', 'nickname', 'avatar'],
                }, {
                    model: app.model.Users,
                    as: "send_user",
                    attributes: ['id', 'username', 'nickname', 'avatar']
                }]
            }],
        });

        return ctx.apiSuccess(rows);
    }

    async read() {
        let { ctx, service, app } = this;
        let userinfo = ctx.authUser;

        ctx.validate({
            id: {
                type: "int",
                required: true,
                desc: "作品ID"
            },
        });

        let { id } = ctx.params;

        let video = await app.model.Video.findOne({
            where: {
                id
            },
            include: [{
                model: app.model.VideoDetail
            }, {
                model: app.model.Users,
                attributes: ['id', 'username', 'nickname', 'avatar']
            }]
        });
        // 5条热门视频
        let hot = await this.hot()

        // 是否已收藏
        let fava = false
        // 是否关注
        let follow = false


        if (userinfo) {
            console.log("rnm")
            fava = !!(await app.model.Fava.findOne({
                where: {
                    video_id: id,
                    user_id: userinfo.id
                }
            }))

            follow = await this.isFollow(userinfo.id, video.user_id);
        }

        ctx.apiSuccess({
            video,
            hot,
            fava,
            follow
        });
    }

    // 当前用户是否关注某用户
    async isFollow(user_id, follow_id) {
        return !!(await this.app.model.Follow.findOne({
            where: {
                user_id,
                follow_id
            }
        }));
    }




    // app首页列表
    async index_data() {
        this.ctx.apiSuccess(await this.hot())
    }


    // 热门视频
    async hot() {
        let { ctx, app } = this;

        let rows = await app.model.Video.findAll({
            order: [
                ['id', 'DESC'],
                ['play_count', 'DESC']
            ],
            limit: 5
        });

        return rows
    }



    async search() {
        let userinfo = this.ctx.userInfo
        this.ctx.validate({
            page: {
                required: true,
                desc: '页码',
                type: 'int'
            },
            keyword: {
                required: true,
                desc: '关建字',
                type: 'string'
            },
            limit: {
                required: false,
                desc: '页中数据',
                type: 'int'
            }
        })
        let page = this.ctx.params.page ? parseInt(this.ctx.params.page) : 1
        let limit = this.ctx.query.limit ? parseInt(this.ctx.query.limit) : 10
        let keyword = this.ctx.query.keyword
        let offset = (page - 1) * limit
        let Op = this.app.Sequelize.Op
        let result = await this.ctx.model.Video.findAll({
            where: {
                title: {
                    [Op.like]: '%' + keyword + "%"
                },
            },
            offset: offset,
            limit: limit
        })

        this.ctx.apiSuccess(result)
    }



    async moive(){
        let result=await this.app.model.Video.findAll({
            where:{
                user_id:32
            }
        })
        console.log(result)
        this.ctx.apiSuccess(result)
    }


    async recommend(){
        let result=await this.app.model.Video.findAll({
            where:{
                category_id:3
            }
        })
        this.ctx.apiSuccess(result)
    }

}






module.exports = VideoController;
