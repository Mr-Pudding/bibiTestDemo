'use strict';

const Controller = require('egg').Controller;

class SorticonController extends Controller {
    async index() {

        let result = await this.ctx.model.Sorticon.findAll()
        if (!result) {
            this.ctx.throw(404, "gg")
        } else {
            this.ctx.apiSuccess(result)
        }
    }
}

module.exports = SorticonController;
