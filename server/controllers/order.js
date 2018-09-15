const DB = require('../utils/db.js');

module.exports = {
    add: async ctx => {
        let user = ctx.state.$wxInfo.userinfo.openId

        // 获取订单产品列表
        let productList = ctx.request.body.list || []

        // 插入订单至 order_user 表
        let order = await DB.query('INSERT INTO order_user(user) VALUES (?)', [user])

        let orderId = order.insertId

        let param = []
        let query = []

        productList.forEach(product => {
            query.push('(?,?,?)')

            param.push(orderId)
            param.push(product.id)
            parampush(product.count || 1)
        })

        await DB.query('INSERT INTO order_product(order_id, product_id, count) VALUES ' + query.join(', '), param)
    }
}
