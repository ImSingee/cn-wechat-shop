const config = require('../../config.js')
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        product: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getProduct(options.id)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    getProduct(id) {
        wx.showLoading({
            title: '商品详情数据加载中',
        })
        qcloud.request({
            url: config.service.productDetailUrl + id,
            success: result => {
                console.log(result)
                let data = result.data
                if (!data.code) {
                    this.setData({
                        product: data.data
                    })
                } else {
                    wx.showToast({
                        title: '商品数据加载失败',
                    })
                    setTimeout(() => {
                        wx.navigateBack()
                    }, 2000)
                }
            },
            error: error => {
                console.error(error)
                wx.showToast({
                    title: '商品数据加载失败',
                })
                setTimeout(() => {
                    wx.navigateBack()
                }, 2000)
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    },

    bindBuy(event) {
        console.log(event)
        this.buy()
    },

    buy() {
        let product = {
            id: this.data.product.id,
            count: 1
        }

        console.log(product)

        wx.showLoading({
            title: '正在下单',
        })
        qcloud.request({
            url: config.service.orderAddUrl,
            method: 'POST',
            login: true,
            data: {
                list: [product]
            },
            success: result => {
                console.log(result)

                let data = result.data
                if (!data.code) {
                    wx.showToast({
                        title: '商品购买成功'
                    })
                } else {
                    wx.showToast({
                        icon: none,
                        title: '商品购买失败'
                    })
                }
            },
            fail: error => {
                console.error(error)
                wx.showToast({
                    icon: none,
                    title: '商品购买失败'
                })
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    }
})
