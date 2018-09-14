const config = require('../../config.js')
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null, // 虚拟数据
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
    this.doQcloudLogin({
      success: ({userInfo}) => {
        this.setData({
          userInfo
        })
      }
    })
  },

  doQcloudLogin({success, error}) {
    qcloud.setLoginUrl(config.service.loginUrl)
    qcloud.login({
      success: result => {
        console.log(result)
        if(result){
          let userInfo = result
          success && success({userInfo})
        }else{
          // 非首次登录，不会返回用户信息，通过用户信息接口获取
          this.getUserInfo({success, error})
        }
      },
      fail: result => {
        console.error(result)
      }
    })
  },

  getUserInfo: ({success, error}) => {
    qcloud.request({
      url: config.service.requestUrl,
      login: true,
      success: result => {
        let data = result.data
        if(!data.code){
          let userInfo = data.data
          success && success({userInfo})
        }else{
          error && error()
        }
      },
      fail: result => {
        console.error(result)
        error && error()
      }
    })
  }
})