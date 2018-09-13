const DB = require("../utils/db.js")

module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM product;")
  },
  detail: async ctx => {
    productId = parseInt(ctx.params.id)

    ctx.state.data = (await DB.query("SELECT * FROM product WHERE product.id = ?", [productId]))[0]
  }
}