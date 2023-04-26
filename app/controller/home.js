'use strict';


const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
     let data={
      id:'1',
      name:'hhs',
      sex:'女'
     }
    
    this.ctx.apiSuccess(data)
    // this.ctx.throw('你好,我是mistake')
  }
}

module.exports = HomeController;
