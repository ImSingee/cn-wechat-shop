const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    name: '',
    price: -1,
    image: '',
    submitDisabled: true,
    commentData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
      name: options.name,
      price: options.price,
      image: options.image
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

  changeInput: function (event) {
    this.setData({
      commentData: event.detail.value,
      submitDisabled: event.detail.value.length === 0
    })
  },

  submit: function () {
    if (this.data.submitDisabled) {
      return false
    }
    console.log(this.data.commentData)

    wx.showLoading({
      title: '正在提交评价',
    })

    qcloud.request({
      url: config.service.commentAddUrl,
      login: true,
      method: 'PUT',
      data: {
        productId: this.data.id,
        content: this.data.commentData
      },
      success: function (response) {
        console.log(response)
        wx.hideLoading()
        if (!response.data.data.error) {
          wx.showToast({
            title: '评价成功',
            complete: function () {
              setTimeout(() => {
                wx.navigateBack()
              }, 1500)
            }
          })
        } else {
          wx.showToast({
            title: '评价失败\r\n' + response.data.data.msg,
            icon: 'none'
          })
        }
      },
      fail: function (error) {
        wx.hideLoading()
        console.error(error)
        wx.showModal({
          title: '请求失败',
          content: error.toString(),
        })
      },
    })
  }
})