'use strict';

const crypto = require('crypto');
const Controller = require('egg').Controller;

class UsersController extends Controller {
    async register() {
        //获取从前端传来的用户名和昵称
        const { username, password, repassword } = this.ctx.request.body

        //参数验证
        this.ctx.validate({
            username: {
                type: 'string',
                required: true,
                desc: '用户名',
                range: {
                    min: 6,
                    max: 16
                }
            },
            password: {
                type: 'string',
                required: true,
                desc: '密码'
            },

            repassword: {
                type: 'string',
                required: true,
                desc: '密码2',
            },
        })

        if (password !== repassword) {
            this.ctx.throw(450, '昵称不相同')
        }


        //查找数据库该用户是否存在
        let findusername = await this.ctx.model.Users.findOne({
            where: {
                username
            }
        })
        //如果存在抛出错误
        if (findusername) {
            this.ctx.throw(400, '用户已存在')
            //否则在数据库中创建该用户
        } else {
            let createUser = await this.ctx.model.Users.create({
                username,
                password
            })
            //并且如果创建失败，抛出异常
            if (!createUser) {
                this.ctx.throw(400, '创建失败')
            }
            //解密转义从数据库取出的数据
            createUser = JSON.parse(JSON.stringify(createUser))
            //删除敏感信息加密密码返回
            delete createUser.password
            //最后返回创建成功的状态
            this.ctx.apiSuccess(createUser)
        }

    }


    async login() {
        //解构
        const { username, password } = this.ctx.request.body
        ////参数验证
        this.ctx.validate({
            username: {
                required: true,
                type: 'string',
                desc: '用户名'
            },
            password: {
                required: true,
                type: 'string',
                desc: '密码'
            }
        })
        //模型数据库查询
        let user = await this.ctx.model.Users.findOne({
            where: {
                username
            }
        })
        //判断用户是否存在
        if (!user) {
            this.ctx.throw(201, '用户名不存在')
        } else {
            //如果存在验证密码
            this.verifyPassword(password, user.password)
            //解密转义从数据库取出的数据
            let newUser = JSON.parse(JSON.stringify(user))
            //将用户信息整体加密创建token
            let token = this.ctx.getToken(newUser)
            //在用户信息中加入token,并删除敏感信息加密密码
            newUser.token = token
            delete newUser.password
            //服务器本地备份一份token，存储到redis上
            let setRedis = await this.service.cache.set('user_' + newUser.id, newUser.token);

            if (!setRedis) {
                this.ctx.throw(201, '登录失败')
            } else {
                this.ctx.apiSuccess(newUser)
            }

        }

    }

    //将用户输入的密码加密并与从数据库取出的密码进行对比
    verifyPassword(password, secretPassword) {
        const hmac = crypto.createHash("sha256", this.app.config.crypto.secret);
        hmac.update(password);
        let secretPswd = hmac.digest("hex");
        if (secretPswd !== secretPassword) {
            this.ctx.throw(201, '用户名或密码错误')
        } else {
            return true
        }
    }


    // 退出登录
    async loginOut() {
        // 拿到当前用户id
        let userInfoId = this.ctx.userInfo.id
        console.log(userInfoId)

        // 移除redis当前用户信息
        let loginOutResult = await this.service.cache.remove('user_' + userInfoId)

        if (!loginOutResult) {
            this.ctx.throw(400, '退出登录失败')
        } else {
            this.ctx.apiSuccess('退出成功')
        }

    }

    // 关注
    async follow() {
        const { ctx, service, app } = this;
        let userinfo = ctx.userInfo;

        ctx.validate({
            follow_id: {
                type: 'int',
                required: true,
                desc: '用户ID'
            },
        });

        let { follow_id } = ctx.request.body;

        let where = {
            user_id: userinfo.id,
            follow_id
        }

        let follow = await app.model.Follow.findOne({ where });

        if (follow) {
            return ctx.apiFail('你已经关注过了');
        }

        // 用户是否存在
        let users = await ctx.model.Users.findOne({
            where: {
                id: follow_id
            }
        })
        if (!users) {
            return ctx.apiFaila("对方不存在")
        }

        // 不能关注自己
        if (userinfo.id === follow_id) {
            return ctx.apiFail('不能关注自己');
        }

        let res = await app.model.Follow.create({ ...where });

        ctx.apiSuccess({
            status: true,
            msg: "关注成功"
        });
    }

    // 取消关注
    async unfollow() {
        const { ctx, service, app } = this;
        let userinfo = ctx.userInfo;

        ctx.validate({
            follow_id: {
                type: 'int',
                required: true,
                desc: '用户ID'
            },
        });

        let { follow_id } = ctx.request.body;

        let where = {
            user_id: userinfo.id,
            follow_id
        }

        let follow = await app.model.Follow.findOne({ where });

        if (!follow) {
            return ctx.apiFail('你还没关注对方');
        }

        let res = await follow.destroy();

        ctx.apiSuccess({
            status: false,
            msg: "取消关注成功"
        });
    }

    // 我的关注列表
    async follows() {
        const { ctx, service, app } = this;
        let userinfo = ctx.userInfo;

        let { page } = ctx.params
        let limit = this.ctx.params.limit ? parseInt(this.ctx.params.limit) : 10
        let offset = (page - 1) * limit


        let rows = await ctx.model.Follow.findAll({
            where: {
                user_id: userinfo.id
            },
            offset,
            limit,
            include: [{
                model: app.model.Users,
                as: 'user_follow',
                attributes: ['id', 'username', 'nickname', 'avatar']
            }]
        })


        // rows = rows.map(item => {
        //     return {
        //         id: item.user_follow.id,
        //         name: item.user_follow.nickname || item.user_follow.username,
        //         avatar: item.user_follow.avatar
        //     }
        // });

        ctx.apiSuccess(rows);
    }

    // 我的粉丝列表
    async fens() {
        const { ctx, app } = this;
        let userinfo = ctx.userInfo;

        let page = ctx.params.page ? ctx.params.page : 1
        let limit = ctx.params.limit ? parseInt(ctx.params.limit) : 1
        let offset = (page - 1) * limit
        console.log(userinfo.id)
        let rows = await ctx.model.Follow.findAll({
            where: {
                follow_id: userinfo.id
            },
            offset,
            limit,
            include: [{
                model: app.model.Users,
                as: "user_fen",
                attributes: ['id', 'username', 'nickname', 'avatar']
            }]
        })

        ctx.apiSuccess(rows);
    }

    // 统计相关数据
    async statistics() {
        const { ctx, service, app } = this;
        let user_id = ctx.userInfo.id;
        // 指定用户关注人数
        let userFollowers = await ctx.model.Follow.count({
            where: {
                user_id
            }
        })
        // 指定用户的作品量
        let userVideos = await ctx.model.Video.count({
            where: {
                user_id
            }
        })

        ctx.apiSuccess({
            userFollowers,
            userVideos
        });
    }

    // 获取用户相关信息
    async user_info() {
        const { ctx, service, app } = this;
        let userinfo = ctx.userInfo;

        ctx.validate({
            user_id: {
                required: true,
                desc: "用户id",
                type: "int"
            }
        });

        let user_id = ctx.query.user_id;

        let res = await this.getUserInfo(user_id);

        let fensCount = 0;

        let followCount = 0;

        if (res) {
            fensCount = await this.getFenCount(user_id);
            followCount = await this.getFollowCount(user_id);
        }

        let follow = false;

        if (userinfo) {
            follow = await this.isFollow(userinfo.id, user_id);
        }

        ctx.apiSuccess({
            user: res,
            fensCount,
            followCount,
            follow
        });
    }

    // 用户相关信息
    async getUserInfo(user_id) {
        return await this.app.model.Users.findOne({
            where: {
                id: user_id
            },
            attributes: {
                exclude: ['password']
            }
        });
    }

    // 指定用户关注人数
    async getFollowCount(user_id) {
        return await this.app.model.Follow.count({
            where: {
                user_id
            }
        });
    }

    // 指定用户的作品量
    async getVideoCount(user_id) {
        return await this.app.model.Video.count({
            where: {
                user_id
            }
        });
    }
    // 指定用户粉丝人数
    async getFenCount(user_id) {
        return this.app.model.Follow.count({
            where: {
                follow_id: user_id
            }
        });
    }
    // 是否关注某人
    async isFollow(user_id, follow_id) {
        return !!(await this.app.model.Follow.findOne({
            where: {
                user_id,
                follow_id
            }
        }));
    }

}

module.exports = UsersController;
