// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    name: '',
    price: -1,
    image: '',
    comments : []
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

    this.setData({
      comments: [{
        username: '昵称',
        content: '内容内容内容内容内容内容内容内容内容内容',
        avatarUrl: options.image // for test
      }, {
        username: '昵称',
        content: '内容内容内容内容内容',
        avatarUrl: options.image // for test
      }]
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

  }
})