// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth,
    screenHeight: app.globalData.screenHeight
  },

  onLoad: function(options) {

  },

  formSubmit: function(e) {
    let username = e.detail.value.username
    let password = e.detail.value.password
    if (username == '' || password == '') {
      wx.showToast({
        title: '输入不能为空',
        image: '/images/warning.png'
      })
    } else {
      wx.request({
        url: 'https://www.hilzh.xyz/upc/login',
        data: {
          username: username,
          password: password
        },
        success: res => {
          if (res.data.errcode == 0) {
            let user = {
              username: username,
              password: password
            }
            wx.setStorageSync('user', user)
            wx.redirectTo({
              url: '/pages/main/main',
            })
          } else {
            wx.showToast({
              title: '学号或密码错误',
              image: '/images/failed.png'
            })
          }
        }
      })
    }
  }
})