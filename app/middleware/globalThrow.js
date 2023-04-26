module.exports = (options, app) => {
    return async function globalThrow(ctx, next) {
        try {
            await next()
            // if(ctx.status==404){
            //    ctx.body={
            //     msg:201,
            //     data:'not found',
            //    }
            // }

        } catch (error) {

            //记录一条错误日志
            app.emit('error', error, ctx);

            const status = error.status || 500;
            //生产环境时500错误的详细错误内容不会返回给客户端，因为可能会包含敏感信息，开发环节直接报错误的message
            let err = status == 500 && app.config.env == 'prod' ? '服务器出错' : error.message

            if (status == 422) {
                if (error.errors) {
                    err = error.errors[0].err[0] ? error.errors[0].err[0] : '参数错误'
                }
            }


            ctx.body = {
                msg: 'fail',
                data: err,
                status
            }
        }
    }
}