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

    qcloud.request({
      url: config.service.commentListUrl,
      data: {
        productId: this.data.id
      },
      success: response => {
        let comments = response.data.data
        comments.map(x => {
          let time = new Date(x.create_time)
          console.log(time)
          x.createTime = `${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日`
          if (x.images) {
            x.imagesList = x.images.split(';;')
          } else {
            x.imagesList = []
          }
        })
        this.setData({
          comments
        })
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

  onTapImage: function (event) {
    let dataset = event.currentTarget.dataset
    wx.previewImage({
      urls: dataset.urls,
      current: dataset.src
    })
  }
})