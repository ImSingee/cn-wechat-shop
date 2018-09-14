//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },

    doQcloudLogin({ success, error }) {
      qcloud.setLoginUrl(config.service.loginUrl)
      qcloud.login({
        success: result => {
          console.log(result)
          if (result) {
            let userInfo = result
            success && success({ userInfo })
          } else {
            // 非首次登录，不会返回用户信息，通过用户信息接口获取
            this.getUserInfo({ success, error })
          }
        },
        fail: result => {
          console.error(result)
        }
      })
    },

    getUserInfo({ success, error }) {
      qcloud.request({
        url: config.service.requestUrl,
        login: true,
        success: result => {
          let data = result.data
          if (!data.code) {
            let userInfo = data.data
            success && success({ userInfo })
          } else {
            error && error()
          }
        },
        fail: result => {
          console.error(result)
          error && error()
        }
      })
    },

    checkSession({ success, error }) {
      wx.checkSession({
        success: () => {
          this.getUserInfo({ success, error })
        },
        fail: () => {
          error && error()
        }
      })
    }
})