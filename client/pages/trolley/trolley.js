const config = require('../../config')
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        trolleyList: [], // 购物车商品列表
        trolleyCheckMap: [], // 购物车中选中的 index 哈希表
        trolleyAccount: 0, // 购物车结算总价
        isTrolleyEdit: false, // 购物车是否处于编辑状态
        isTrolleyTotalCheck: false, // 购物车中商品是否全选
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
        app.checkSession({
            success: ({userInfo}) => {
                this.setData({userInfo})
                this.getTrolleyList()
            }
        })
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

    changeTrolleyEdit() {
        this.setData({
            isTrolleyEdit: !this.data.isTrolleyEdit
        })
    },

    getTrolleyList() {
        wx.showLoading({
            title: '正在获取',
        })
        qcloud.request({
            url: config.service.trolleyListUrl,
            method: 'GET',
            login: true,
            success: result => {
                console.log(result)

                let data = result.data
                if (!data.code) {
                    console.log(data.data)
                    let trolleyList = data.data.products
                    let trolleyCheckMap = Array(trolleyList.length)
                    trolleyCheckMap.fill(false)
                    this.setData({
                        trolleyList,
                        trolleyCheckMap
                    })
                } else {
                    wx.showToast({
                        icon: none,
                        title: '获取失败'
                    })
                }
            },
            fail: error => {
                console.error(error)
                wx.showToast({
                    icon: none,
                    title: '获取失败'
                })
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    },

    setSingleCheck(event) {
        console.log(event)

        let index = event.currentTarget.dataset.index
        console.log(index)

        let trolleyCheckMap = this.data.trolleyCheckMap
        trolleyCheckMap[index] = !trolleyCheckMap[index]

        this.setData({trolleyCheckMap})
        this.refreshTotalCheck()
        this.refreshAccount()
    },

    setTotalCheck(event) {
        let isTrolleyTotalCheck = !this.data.isTrolleyTotalCheck
        let trolleyCheckMap = this.data.trolleyCheckMap
        trolleyCheckMap.fill(isTrolleyTotalCheck)

        this.setData({
            isTrolleyTotalCheck,
            trolleyCheckMap
        })
        this.refreshAccount()
    },

    refreshTotalCheck() {
        let isTrolleyTotalCheck = this.data.isTrolleyTotalCheck
        let trolleyCheckMap = this.data.trolleyCheckMap
        let count = 0
        trolleyCheckMap.forEach(check => {
            if (check) {
                count++
            }
        })
        isTrolleyTotalCheck = count === trolleyCheckMap.length

        this.setData({
            isTrolleyTotalCheck
        })
    },

    refreshAccount() {
        let trolleyAccount = 0
        let trolleyList = this.data.trolleyList
        let trolleyCheckMap = this.data.trolleyCheckMap
        trolleyCheckMap.forEach((check, index) => {
            if (check) {
                trolleyAccount += trolleyList[index].price * trolleyList[index].count
            }
        })

        this.setData({
            trolleyAccount
        })
    }
})
