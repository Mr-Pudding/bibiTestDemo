module.exports = (option, app) => {
    return async (ctx, next) => {
        const { token } = ctx.header;
        if (!token) {
            ctx.throw(401, '用户未授权')
        } else {
            let user = {}
            try {
                user = app.jwt.verify(token, app.config.jwt.secret)
            } catch (error) {
                let fail = error.name == 'TokenExpiredError' ? 'token 已过期! 请重新获取令牌' : 'Token 令牌不合法!';
                ctx.throw(201, fail)
            }

            let redisUser = await ctx.service.cache.get('user_' + user.id)
            if (!redisUser) {
                ctx.throw(400, '用户未授权')
            }

            ctx.userInfo = user
        }
        await next()
    }
}