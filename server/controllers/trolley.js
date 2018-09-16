const DB = require('../utils/db.js')

module.exports = {
    add: async ctx => {
        let user = ctx.state.$wxInfo.userinfo.openId
        let product_id = ctx.request.body.product.id

        ctx.state.data = {user, product_id}

        let obj = await DB.query('SELECT * FROM trolley_user WHERE trolley_user.id = ? AND trolley_user.user = ?', [product_id, user])

        if (obj.length > 0) {
            let count = obj[0].count + 1
            await DB.query('UPDATE trolley_user SET count = ? WHERE trolley_user.id = ? AND trolley_user.user = ?', [count, product_id, user])
        } else {
            await DB.query('INSERT INTO trolley_user(id, count, user) VALUES (?, ?, ?)', [product_id, 1, user])
        }
    }
}