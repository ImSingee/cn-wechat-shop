const DB = require('../utils/db.js')

module.exports = {
    add: async ctx => {
        let user = ctx.state.$wxInfo.userinfo.openId

        // 获取订单产品列表
        let productList = ctx.request.body.list || []

        // 插入订单至 order_user 表
        let order = await DB.query('INSERT INTO order_user (user) VALUES (?)', [user])

        let orderId = order.insertId

        let param = []
        let query = []

        productList.forEach(product => {
            query.push('(?,?,?)')

            param.push(orderId)
            param.push(product.id)
            param.push(product.count || 1)
        })

        await DB.query('INSERT INTO order_product (order_id, product_id, count) VALUES ' + query.join(', '), param)
    },

    list: async ctx => {
        let user = ctx.state.$wxInfo.userinfo.openId

        let list = await DB.query(
            'SELECT order_user.id AS `id`, order_user.user AS `user`, order_user.create_time AS `create_time`, order_product.product_id AS `product_id`, order_product.count AS `count`, ' +
            'product.name AS `name`, product.image AS `image`, product.price AS `price` ' +
            'FROM order_user LEFT JOIN order_product ' +
            'ON order_user.id = order_product.order_id ' +
            'LEFT JOIN product ' +
            'ON order_product.product_id = product.id ' +
            'WHERE order_user.user = ? ' +
            'ORDER BY order_product.order_id', [user]
        )

        let ret = []

        list.forEach(item => {
            let index = ret.findIndex(e => e.id === item.id)
            if (index !== -1) {
                ret[index].list.push({
                    name: item.name,
                    price: item.price,
                    count: item.count,
                    image: item.image,
                    id: item.product_id
                })
            } else {
                ret.push({
                    id: item.id,
                    list: [{
                        name: item.name,
                        price: item.price,
                        count: item.count,
                        image: item.image,
                        id: item.product_id
                    }]
                })
            }

        })

        ctx.state.data = {
            orderList: ret
        }
    }
}
