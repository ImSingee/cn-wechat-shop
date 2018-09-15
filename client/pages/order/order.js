const config = require('../../config')
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        orderList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.checkSession({
            success: ({userInfo}) => {
                this.setData({userInfo})
                this.getOrder()
            }
        })
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

    onTapLogin() {
        app.doQcloudLogin({
            success: ({userInfo}) => {
                this.setData({
                    userInfo
                })
            }
        })
    },

    getOrder() {
        wx.showLoading({
            title: '正在获取订单列表'
        })
        qcloud.request({
            url: config.service.orderListUrl,
            login: true,
            success: result => {
                let data = result.data
                console.log(data.data)
                if(!data.code){
                  this.setData({
                    orderList: data.data.orderList
                  })
                }
            },
            fail: error => {
                console.error(error)
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    }
})
