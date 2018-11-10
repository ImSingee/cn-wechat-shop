const DB = require('../utils/db.js')

module.exports = {
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    let productId = +ctx.request.body.productId
    let content = ctx.request.body.content || null
    let images = ctx.request.body.images || []


    if (!isNaN(productId)) {
      await DB.query('INSERT INTO comment (user, username, avatar, content, product_id, images) VALUES (?, ?, ?, ?, ?, ?)', [user, username, avatar, content, productId, images.join(';;')])
      ctx.state.data = {
        msg: 'OK'
      }
    } else {
      ctx.state.data = {
        error: true,
        msg: 'productId must be number'
      }
    }

    
    
  },
  list: async ctx => {
    let productId = +ctx.request.query.productId

    if (!isNaN(productId)) {
      ctx.state.data = await DB.query('SELECT * FROM comment WHERE product_id=?', [productId])
    } else {
      ctx.state.data = []
    }
  },
  listFirst: async ctx => {
    let productId = +ctx.request.query.productId

    if (!isNaN(productId)) {
      ctx.state.data = {
        count: (await DB.query('SELECT count(id) AS count FROM comment WHERE product_id=?', [productId]))[0]['count'],
        first: (await DB.query('SELECT content FROM comment WHERE product_id=? LIMIT 1', [productId]))[0]
      }
    } else {
      ctx.state.data = []
    }
  }
}