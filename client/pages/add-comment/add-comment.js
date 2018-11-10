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
    commentData: '',
    images: []
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

  changeInput: function (event) {
    this.setData({
      commentData: event.detail.value,
      submitDisabled: event.detail.value.length === 0
    })
  },

  onTapCamera: function (event) {
    const maxLength = 3
    let canChooseNumber = maxLength - this.data.images.length

    if (canChooseNumber > 0) {
      wx.chooseImage({
        count: canChooseNumber,
        sizeType: ['compressed'],
        success: res => {
          this.setData({
            images: this.data.images.concat(res.tempFilePaths)
          })
        },
      })
    } else {
      wx.showToast({
        title: `最多选择 ${maxLength} 张图片`,
        icon: 'none'
      })
    }
    
  },

  onTapImage: function (event) {
    wx.previewImage({
      urls: this.data.images,
      current: event.currentTarget.dataset.src
    })
  },

  onLongTapImage: function (event) {
    wx.showModal({
      title: '',
      content: '删除此图片？',
      confirmText: '确定删除',
      success: res => {
        if (res.confirm) {
          let images = this.data.images
          images = images.filter(element => element !== event.currentTarget.dataset.src)
          this.setData({ images })
        }
      }
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